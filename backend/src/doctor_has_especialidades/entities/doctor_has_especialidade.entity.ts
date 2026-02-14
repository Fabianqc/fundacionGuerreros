import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import crypto from "crypto";
import { Doctor } from "../../doctor/entities/doctor.entity";
import { Especialidade } from "../../especialidades/entities/especialidade.entity";

@Entity('Doctor_has_Especialidades')
export class DoctorHasEspecialidade {

    @PrimaryColumn('uuid', { name: 'Doctor_UUID' })
    doctorId: string;

    @PrimaryColumn('uuid', { name: 'Especialidades_UUID' })
    especialidadId: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.doctor_especialidades)
    @JoinColumn({ name: 'Doctor_UUID' })
    doctor: Doctor;

    @ManyToOne(() => Especialidade, (especialidade) => especialidade.doctor_especialidades)
    @JoinColumn({ name: 'Especialidades_UUID' })
    especialidad: Especialidade;

}
