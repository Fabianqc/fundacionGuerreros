import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import crypto from "crypto";

@Entity('Especialidades')
export class Especialidade {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({name:"Especialidad", length: 100})
    nombre: string;
}
