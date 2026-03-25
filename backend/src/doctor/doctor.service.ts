import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorHasEspecialidade } from 'src/doctor_has_especialidades/entities/doctor_has_especialidade.entity';
import { DoctorHorario } from 'src/doctor-horario/entities/doctor-horario.entity';
import { DataSource, MoreThanOrEqual } from 'typeorm';
import { DoctorHasEspecialidadesService } from 'src/doctor_has_especialidades/doctor_has_especialidades.service';
import { Persona } from 'src/personas/entities/persona.entity';

import { DoctorHorarioService } from 'src/doctor-horario/doctor-horario.service';

import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        private readonly dataSource: DataSource,
        private readonly doctorHasEspecialidadesService: DoctorHasEspecialidadesService,
        private readonly doctorHorarioService: DoctorHorarioService
    ) { }


    async update(updateDoctorDto: UpdateDoctorDto) {
        const { ci_doctor, tipo_cedula, especialidades } = updateDoctorDto;
        
        if (ci_doctor === undefined || tipo_cedula === undefined) {
            throw new BadRequestException('ci_doctor y tipo_cedula son requeridos para actualizar');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const persona = await queryRunner.manager.findOne(Persona, { where: { cedula: ci_doctor, tipo_cedula: tipo_cedula } });
            if (!persona) {
                throw new BadRequestException('Persona no encontrada');
            }
            const doctor = await queryRunner.manager.findOne(Doctor, { where: { persona: { id: persona.id } } });
            if (!doctor) {
                throw new BadRequestException('Doctor no encontrado');
            }
            if (updateDoctorDto.licenseNumber !== undefined) {
                doctor.licenseNumber = updateDoctorDto.licenseNumber;
            }
            if (updateDoctorDto.status !== undefined) {
                doctor.status = updateDoctorDto.status;
            }
            await queryRunner.manager.save(doctor);

            if (especialidades !== undefined) {
                // Eliminar especialidades antiguas para reasignar las nuevas
                await queryRunner.manager.delete(DoctorHasEspecialidade, { doctor: { id: doctor.id } });

                await this.doctorHasEspecialidadesService.create({
                    tipo_cedula: tipo_cedula,
                    ci_doctor: ci_doctor,
                    name_especialidad: especialidades
                }, queryRunner.manager);
            }

            if (updateDoctorDto.horarios !== undefined) {
                // Eliminar horarios futuros para reasignar los nuevos
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                await queryRunner.manager.delete(DoctorHorario, { 
                    doctor: { id: doctor.id },
                    fecha: MoreThanOrEqual(today)
                });

                await this.doctorHorarioService.create(updateDoctorDto.horarios, doctor, queryRunner.manager);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
        return;
    }

    async findAllWithLimit(skip: number, take: number, search: string) {
        const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');
        queryBuilder.leftJoinAndSelect('doctor.persona', 'persona');
        queryBuilder.leftJoinAndSelect('doctor.doctor_especialidades', 'doctor_especialidades');
        queryBuilder.leftJoinAndSelect('doctor_especialidades.especialidad', 'especialidad');
        if (search) {
            queryBuilder.where('persona.fullname ILIKE :search OR persona.cedula ILIKE :search', { search: `%${search}%` });
        }
        queryBuilder.skip(skip);
        queryBuilder.take(take);
        const [doctors, total] = await queryBuilder.getManyAndCount();
        return { doctors, total };
    }

    async findAll() {
        const doctors = await this.doctorRepository.find({ relations: ['persona', 'doctor_especialidades.especialidad'] });
        return doctors.map(doctor => {
            const transformed = instanceToPlain(doctor);
            transformed.doctor_especialidades = doctor.doctor_especialidades?.map(de => ({
                nombre: de.especialidad.nombre
            })) || [];
            return transformed;
        });
    }

    async findOne(ci_doctor: string, tipo_cedula: string) {
        const doctor = await this.doctorRepository.findOne({
            where: { persona: { cedula: ci_doctor, tipo_cedula: tipo_cedula } },
            relations: ['doctor_especialidades.especialidad', 'doctor_horario']
        });
        if (!doctor) {
            throw new BadRequestException('Doctor no encontrado');
        }
        const transformed = instanceToPlain(doctor);
        transformed.doctor_especialidades = doctor.doctor_especialidades?.map(de => de.especialidad.nombre) || [];
        transformed.horarios = this.doctorHorarioService.reconstructDto(doctor.doctor_horario);
        return transformed;
    }

    async create(createDoctorDto: CreateDoctorDto) {
        // La sección de horarios aún debe desarrollarse.
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const persona = await queryRunner.manager.findOne(Persona, { where: { cedula: createDoctorDto.ci_doctor, tipo_cedula: createDoctorDto.tipo_cedula } });
            if (!persona) {
                throw new BadRequestException('Persona no encontrada');
            }
            const doctorExistente = await queryRunner.manager.findOne(Doctor, { where: { persona: persona } });
            if (doctorExistente) {
                throw new BadRequestException('Doctor ya existe');
            }

            const doctor = queryRunner.manager.create(Doctor, {
                persona: persona,
                licenseNumber: createDoctorDto.licenseNumber,
                status: createDoctorDto.status
            });
            await queryRunner.manager.save(doctor);
            await this.doctorHasEspecialidadesService.create({
                tipo_cedula: createDoctorDto.tipo_cedula,
                ci_doctor: createDoctorDto.ci_doctor,
                name_especialidad: createDoctorDto.especialidades
            }, queryRunner.manager);
            
            if (createDoctorDto.horarios) {
                await this.doctorHorarioService.create(createDoctorDto.horarios, doctor, queryRunner.manager);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
        return;
    }

}
