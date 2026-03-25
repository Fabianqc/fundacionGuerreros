import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";

export enum Parentesco {
    MADRE = "MADRE",
    PADRE = "PADRE",
    ESPOSO = "ESPOSO",
    ESPOSA = "ESPOSA",
    CONCUBINO = "CONCUBINO",
    CONCUBINA = "CONCUBINA",
    HIJO = "HIJO",
    HIJA = "HIJA",
    HERMANO = "HERMANO",
    HERMANA = "HERMANA",
    ABUELO = "ABUELO",
    ABUELA = "ABUELA",
    NIETO = "NIETO",
    NIETA = "NIETA",
    TIO = "TIO",
    TIA = "TIA",
    SOBRINO = "SOBRINO",
    SOBRINA = "SOBRINA",
    PRIMO = "PRIMO",
    PRIMA = "PRIMA",
    SUEGRO = "SUEGRO",
    SUEGRA = "SUEGRA",
    YERNO = "YERNO",
    NUERA = "NUERA",
    CUNADO = "CUÑADO",
    CUNADA = "CUÑADA",
    TUTOR_LEGAL = "TUTOR_LEGAL",
    OTRO = "OTRO"
}

@Entity('NucleoFamiliar')
export class NucleoFamiliar {

    @PrimaryColumn({ name: 'Paciente_UUID', type: 'uuid' })
    pacienteId: string;

    @PrimaryColumn({ name: 'Personas_UUID', type: 'uuid' })
    personaId: string;

    @ManyToOne(() => Paciente, (paciente) => paciente.nucleoFamiliar)
    @JoinColumn({ name: 'Paciente_UUID' })
    paciente: Paciente;

    @ManyToOne(() => Persona, (persona) => persona.nucleoFamiliar)
    @JoinColumn({ name: 'Personas_UUID' })
    persona: Persona;

    @Column({
        type: 'enum',
        enum: Parentesco,
        name: 'Parentesco',
        nullable: false
    })
    parentesco: Parentesco;
}
