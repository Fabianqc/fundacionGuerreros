import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDoctorHasEspecialidadeDto } from './dto/create-doctor_has_especialidade.dto';
import { UpdateDoctorHasEspecialidadeDto } from './dto/update-doctor_has_especialidade.dto';
import { Repository } from 'typeorm';
import { DoctorHasEspecialidade } from './entities/doctor_has_especialidade.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorHasEspecialidadesService {

  constructor(
    @InjectRepository(DoctorHasEspecialidade)
    private readonly doctorHasEspecialidadeRepository: Repository<DoctorHasEspecialidade>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Especialidade)
    private readonly especialidadRepository: Repository<Especialidade>,
    private readonly dataSource: DataSource
  ) { }

  async create(createDoctorHasEspecialidadeDto: CreateDoctorHasEspecialidadeDto, manager?: EntityManager) {
    let transactionManager: EntityManager;
    let queryRunner: QueryRunner | null = null;

    if (manager) {
      transactionManager = manager;
    } else {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      transactionManager = queryRunner.manager;
    }

    try {
      // 1. Buscar Doctor (usando el transactionManager para ver cambios no commiteados)
      const doctor = await transactionManager.findOne(Doctor, {
        where: {
          persona: {
            cedula: createDoctorHasEspecialidadeDto.ci_doctor,
            tipo_cedula: createDoctorHasEspecialidadeDto.tipo_cedula
          }
        }
      });

      if (!doctor) {
        throw new BadRequestException('Doctor no encontrado');
      }

      // 2. Iterar Especialidades
      for (let i = 0; i < createDoctorHasEspecialidadeDto.name_especialidad.length; i++) {
        const nombreEspecialidad = createDoctorHasEspecialidadeDto.name_especialidad[i];

        const especialidad = await transactionManager.findOne(Especialidade, {
          where: { nombre: nombreEspecialidad }
        });

        if (!especialidad) {
          throw new BadRequestException(`Especialidad '${nombreEspecialidad}' no encontrada`);
        }

        const doctorHasEspecialidadExistente = await transactionManager.findOne(DoctorHasEspecialidade, {
          where: { doctor: { id: doctor.id }, especialidad: { id: especialidad.id } }
        });

        if (doctorHasEspecialidadExistente) {
          throw new BadRequestException(`Doctor ya tiene la especialidad: ${nombreEspecialidad}`);
        }

        const doctorHasEspecialidad = transactionManager.create(DoctorHasEspecialidade, {
          doctor: doctor,
          especialidad: especialidad
        });

        await transactionManager.save(doctorHasEspecialidad);
      }

      if (queryRunner) {
        await queryRunner.commitTransaction();
      }

      // Retornar resultado usando el manager activo
      return transactionManager.find(DoctorHasEspecialidade, {
        where: { doctor: { id: doctor.id } },
        relations: { especialidad: true }
      });

    } catch (error) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (queryRunner) {
        await queryRunner.release();
      }
    }
  }

  findAll() {
    return `This action returns all doctorHasEspecialidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorHasEspecialidade`;
  }

  update(id: number, updateDoctorHasEspecialidadeDto: UpdateDoctorHasEspecialidadeDto) {
    return `This action updates a #${id} doctorHasEspecialidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorHasEspecialidade`;
  }
}
