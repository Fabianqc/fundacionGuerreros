import { Entity, ManyToOne, JoinColumn } from "typeorm";
import crypto from "crypto";
import { Doctor } from "../../doctor/entities/doctor.entity";
import { Especialidade } from "../../especialidades/entities/especialidade.entity";

@Entity('Doctor_has_Especialidades')
export class DoctorHasEspecialidade {

    @ManyToOne(() => Doctor)
    @JoinColumn({ name: 'Doctor_UUID' })
    doctor_id: crypto.UUID;
   
    @ManyToOne(() => Especialidade)
    @JoinColumn({ name: 'Especialidades_UUID' })
    especialidade_id: crypto.UUID;

}
