import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import crypto from "crypto";
import { Consulta } from "src/consulta/entities/consulta.entity";
@Entity('IMG')
export class Img {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Ruta", length: 100 })
    path: string;

    @ManyToOne(() => Consulta, (consulta) => consulta.images)
    @JoinColumn({ name: 'Consulta_UUID' })
    consulta: Consulta;
}
