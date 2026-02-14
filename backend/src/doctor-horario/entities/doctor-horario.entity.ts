import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Exclude } from "class-transformer";
import * as crypto from "crypto";
import { Doctor } from "src/doctor/entities/doctor.entity";

@Entity('DoctorHorario')
export class DoctorHorario {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @ManyToOne(() => Doctor, (doctor) => doctor.doctor_horario)
    @JoinColumn({ name: 'Doctor_UUID' })
    doctor: Doctor;

    @Column({ name: 'Fecha', nullable: false })
    fecha: Date;

    @Column({ name: 'HoraInicio', nullable: false, type: 'time without time zone' })
    hora_inicio: string;

    @Column({ name: 'HoraFinal', nullable: false, type: 'time without time zone' })
    hora_fin: string;

    }
