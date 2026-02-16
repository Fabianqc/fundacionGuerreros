import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import crypto from "crypto";
import { ConsultaHasPatologia } from "src/consulta_has_patologia/entities/consulta_has_patologia.entity";
import { Exclude } from "class-transformer";
@Entity('Patologia')
export class Patologia {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @Column({ name: "Name", length: 100 })
    name: string;

    @Column({ name: "Riesgo", enum: ['Bajo', 'Medio', 'Alto'] })
    riesgo: string;

    @Column({ name: "Descripcion", length: 1000 })
    descripcion: string;

    @OneToMany(() => ConsultaHasPatologia, (ConsultaHasPatologia) => ConsultaHasPatologia.patologia)
    @Exclude()
    consulta_has_patologia: ConsultaHasPatologia[];
}
