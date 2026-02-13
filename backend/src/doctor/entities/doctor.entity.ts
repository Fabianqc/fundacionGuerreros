import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import * as crypto from "crypto";
import { Persona } from "src/personas/entities/persona.entity";


@Entity()
export class Doctor {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @ManyToOne(() => Persona, (persona) => persona.id)
    @JoinColumn({ name: 'Persona_UUID' })
    persona: Persona;

}
