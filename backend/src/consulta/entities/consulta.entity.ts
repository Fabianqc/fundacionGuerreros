import { Usuario } from "src/usuario/entities/usuario.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { ConsultaHasPatologia } from "src/consulta_has_patologia/entities/consulta_has_patologia.entity";
import { Img } from "src/img/entities/img.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import crypto from "crypto";
@Entity('Consulta')
export class Consulta {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Fecha" })
    fecha: Date;

    @Column({ name: "Observacion" })
    observacion: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.consultas)
    @JoinColumn({ name: 'Doctor_UUID' })
    doctor: Doctor;

    @ManyToOne(() => Paciente, (paciente) => paciente.consultas)
    @JoinColumn({ name: 'Paciente_UUID' })
    paciente: Paciente;

    @ManyToOne(() => Usuario, (usuario) => usuario.consultas)
    @JoinColumn({ name: 'Usuario_UUID' })
    usuario: Usuario;

    @OneToMany(() => ConsultaHasPatologia, (consultaHasPatologia) => consultaHasPatologia.consulta)
    consulta_has_patologia: ConsultaHasPatologia[];

    @OneToMany(() => Img, (img) => img.consulta)
    images: Img[];
}
