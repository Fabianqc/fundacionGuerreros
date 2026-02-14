import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import * as crypto from "crypto";
import { Persona } from "src/personas/entities/persona.entity";
import { DoctorHorario } from "src/doctor-horario/entities/doctor-horario.entity";
import { DoctorHasEspecialidade } from "src/doctor_has_especialidades/entities/doctor_has_especialidade.entity";
import { Consulta } from "src/consulta/entities/consulta.entity";


@Entity()
export class Doctor {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @ManyToOne(() => Persona, (persona) => persona.id)
    @JoinColumn({ name: 'Persona_UUID' })
    persona: Persona;

    @OneToMany(() => DoctorHorario, (DoctorHorario) => DoctorHorario.doctor)
    doctor_horario: DoctorHorario[];

    @OneToMany(() => DoctorHasEspecialidade, (doctorHasEspecialidade) => doctorHasEspecialidade.doctor_id)
    doctor_especialidades: DoctorHasEspecialidade[];

    @OneToMany(() => Consulta, (consulta) => consulta.doctor)
    consultas: Consulta[];
}
