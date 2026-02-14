import { ManyToOne, Entity, JoinColumn, PrimaryColumn } from "typeorm";
import { Consulta } from "src/consulta/entities/consulta.entity";
import { Patologia } from "src/patologia/entities/patologia.entity";

@Entity('Consulta_has_Patologia')
export class ConsultaHasPatologia {

    @PrimaryColumn('uuid', { name: 'Consulta_UUID' })
    consultaId: string;

    @PrimaryColumn('uuid', { name: 'Patologia_UUID' })
    patologiaId: string;

    @ManyToOne(() => Consulta, (consulta) => consulta.consulta_has_patologia)
    @JoinColumn({ name: 'Consulta_UUID' })
    consulta: Consulta;

    @ManyToOne(() => Patologia, (patologia) => patologia.consulta_has_patologia)
    @JoinColumn({ name: 'Patologia_UUID' })
    patologia: Patologia;
}
