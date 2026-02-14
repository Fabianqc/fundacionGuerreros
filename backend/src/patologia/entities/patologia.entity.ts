import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import crypto from "crypto";
import { ConsultaHasPatologia } from "src/consulta_has_patologia/entities/consulta_has_patologia.entity";
@Entity('Patologia')
export class Patologia {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @Column({ name: "Name", length: 100 })
    name: string;

    @OneToMany(() => ConsultaHasPatologia, (ConsultaHasPatologia) => ConsultaHasPatologia.patologia)
    consulta_has_patologia: ConsultaHasPatologia[];
}
