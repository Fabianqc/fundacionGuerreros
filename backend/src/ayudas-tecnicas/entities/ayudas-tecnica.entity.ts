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

    @ManyToOne(() => Paciente, (Paciente) => Paciente.id)
    paciente: Paciente;

    @ManyToOne(() => Usuario, (Usuario) => Usuario.id)
    usuario: Usuario;

    @ManyToOne(() => TipoAyuda, (tipoAyuda) => tipoAyuda.ayudasTecnica)
    @JoinColumn({ name: 'TipoAyuda_UUID' })
    tipoAyuda: TipoAyuda;



}
