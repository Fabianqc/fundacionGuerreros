import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { Exclude } from "class-transformer";
import * as crypto from "crypto";
import { Persona } from "src/personas/entities/persona.entity";
import { DoctorHorario } from "src/doctor-horario/entities/doctor-horario.entity";
import { DoctorHasEspecialidade } from "src/doctor_has_especialidades/entities/doctor_has_especialidade.entity";
import { Consulta } from "src/consulta/entities/consulta.entity";


export enum DoctorStatus {
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

@Entity('Doctor')
export class Doctor {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @ManyToOne(() => Persona, (persona) => persona.doctors)
    @JoinColumn({ name: 'Personas_UUID' })
    persona: Persona;

    @Column({ name: "LicenseNumber", length: 100 })
    licenseNumber: string;

    @Column({ name: "Status", enum: DoctorStatus })
    status: DoctorStatus;

    @OneToMany(() => DoctorHorario, (DoctorHorario) => DoctorHorario.doctor)
    doctor_horario: DoctorHorario[];

    @OneToMany(() => DoctorHasEspecialidade, (doctorHasEspecialidade) => doctorHasEspecialidade.doctor)
    doctor_especialidades: DoctorHasEspecialidade[];

    @OneToMany(() => Consulta, (consulta) => consulta.doctor)
    consultas: Consulta[];
}
