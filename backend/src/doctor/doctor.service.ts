import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorHasEspecialidade } from 'src/doctor_has_especialidades/entities/doctor_has_especialidade.entity';
import { DoctorHorario } from 'src/doctor-horario/entities/doctor-horario.entity';
import { DataSource } from 'typeorm';
import { DoctorHasEspecialidadesService } from 'src/doctor_has_especialidades/doctor_has_especialidades.service';
import { Persona } from 'src/personas/entities/persona.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(DoctorHorario)
        private readonly doctorHorarioRepository: Repository<DoctorHorario>,
        private readonly dataSource: DataSource,
        private readonly doctorHasEspecialidadesService: DoctorHasEspecialidadesService) { }



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
        return await this.doctorRepository.findOne({ where: { persona: { cedula: ci_doctor, tipo_cedula: tipo_cedula } } });
    }

    async create(createDoctorDto: CreateDoctorDto) {
        //The schedules section still needs to be developed.
        console.log(createDoctorDto);
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
