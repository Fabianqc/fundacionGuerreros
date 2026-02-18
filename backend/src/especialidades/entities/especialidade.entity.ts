import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import crypto from "crypto";
import { DoctorHasEspecialidade } from "src/doctor_has_especialidades/entities/doctor_has_especialidade.entity";
import { Exclude } from "class-transformer";

@Entity('Especialidades')
export class Especialidade {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @Column({ name: "Espacialidad", length: 100 })
    nombre: string;

    @OneToMany(() => DoctorHasEspecialidade, (doctorHasEspecialidade) => doctorHasEspecialidade.especialidad)
    doctor_especialidades: DoctorHasEspecialidade[];
}
