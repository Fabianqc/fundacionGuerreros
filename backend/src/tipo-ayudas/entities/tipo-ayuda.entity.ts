import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import crypto from "crypto";
import { AyudasTecnica } from "../../ayudas-tecnicas/entities/ayudas-tecnica.entity";
@Entity('TipoAyuda')
export class TipoAyuda {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({name:"TipoAyuda", length: 100})
    nombre: string;

    @OneToMany(()=> AyudasTecnica, (AyudasTecnica) => AyudasTecnica.tipoAyuda)
    ayudasTecnica: AyudasTecnica[];
}
