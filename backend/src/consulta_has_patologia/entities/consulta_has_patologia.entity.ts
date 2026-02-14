import { ManyToOne, Entity } from "typeorm";
import { Consulta } from "src/consulta/entities/consulta.entity";
import { Patologia } from "src/patologia/entities/patologia.entity";

@Entity('Consulta_has_Patologia')
export class ConsultaHasPatologia {
   
    @ManyToOne(()=> Consulta, (Consulta) => Consulta.id)
    consulta: Consulta;

    @ManyToOne(()=> Patologia, (Patologia) => Patologia.id)
    patologia: Patologia;
}
