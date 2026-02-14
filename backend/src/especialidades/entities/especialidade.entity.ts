import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import crypto from "crypto";
import { DoctorHasEspecialidade } from "src/doctor_has_especialidades/entities/doctor_has_especialidade.entity";

@Entity('Especialidades')
export class Especialidade {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Especialidad", length: 100 })
    nombre: string;

    @OneToMany(() => DoctorHasEspecialidade, (doctorHasEspecialidade) => doctorHasEspecialidade.especialidad)
    doctor_especialidades: DoctorHasEspecialidade[];
}
