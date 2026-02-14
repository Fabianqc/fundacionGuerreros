import { Usuario } from "src/usuario/entities/usuario.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { ConsultaHasPatologia } from "src/consulta_has_patologia/entities/consulta_has_patologia.entity";
import { Img } from "src/img/entities/img.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import crypto from "crypto";
export class Consulta {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Fecha" })
    fecha: Date;

    @Column({ name: "Observacion" })
    observacion: string;

    @ManyToOne(() => Doctor, (Doctor) => Doctor.id)
    doctor: Doctor;

    @ManyToOne(() => Paciente, (Paciente) => Paciente.id)
    paciente: Paciente;

    @ManyToOne(() => Usuario, (Usuario) => Usuario.id)
    usuario: Usuario;

    @OneToMany(() => ConsultaHasPatologia, (ConsultaHasPatologia) => ConsultaHasPatologia.consulta)
    consulta_has_patologia: ConsultaHasPatologia[];

    @OneToMany(() => Img, (img) => img.consulta)
    images: Img[];
}
