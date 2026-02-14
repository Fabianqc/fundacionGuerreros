import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import crypto from "crypto";
import { TipoAyuda } from "../../tipo-ayudas/entities/tipo-ayuda.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";


@Entity('AyudasTecnica')
export class AyudasTecnica {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Fecha", type: 'date' })
    fecha: Date;

    @Column({ name: 'Observacion', type: 'text' })
    observaciones: string;

    @ManyToOne(() => Paciente, (paciente) => paciente.ayudasTecnicas)
    @JoinColumn({ name: 'Paciente_UUID' })
    paciente: Paciente;

    @ManyToOne(() => Usuario, (usuario) => usuario.ayudasTecnicas)
    @JoinColumn({ name: 'Usuario_UUID' })
    usuario: Usuario;

    @ManyToOne(() => TipoAyuda, (tipoAyuda) => tipoAyuda.ayudasTecnica)
    @JoinColumn({ name: 'TipoAyuda_UUID' })
    tipoAyuda: TipoAyuda;



}
