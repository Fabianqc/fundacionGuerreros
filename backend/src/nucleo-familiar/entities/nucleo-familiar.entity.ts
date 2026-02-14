import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";

export enum Parentesco {
    PADRE = "Padre",
    MADRE = "Madre",
    HIJO = "Hijo",
    HIJA = "Hija",
    ESPOSO = "Esposo",
    ESPOSA = "Esposa",
    HERMANO = "Hermano",
    HERMANA = "Hermana",
    ABUELO = "Abuelo",
    ABUELA = "Abuela",
    NIETO = "Nieto",
    NIETA = "Nieta",
    TIO = "Tio",
    TIA = "Tia",
    SOBRINO = "Sobrino",
    SOBRINA = "Sobrina",
    PRIMO = "Primo",
    PRIMA = "Prima",
    OTRO = "Otro"
}

@Entity('NucleoFamiliar')
export class NucleoFamiliar {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: string;

    @ManyToOne(() => Paciente, (paciente) => paciente.nucleoFamiliar)
    @JoinColumn({ name: 'paciente_UUID' })
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
