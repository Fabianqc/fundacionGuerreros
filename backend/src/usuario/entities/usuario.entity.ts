import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as crypto from 'crypto';
import { Persona } from 'src/personas/entities/persona.entity';
import { Exclude } from 'class-transformer';


@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @Column({ unique: true, name: 'Email', nullable: false })
    email: string;

    @Column({ name: 'Pashash', nullable: false }) // Do not return password by default
    @Exclude()
    password: string;

    @Column({ name: 'Status', nullable: false })
    status: boolean;

    @ManyToOne(() => Persona, (persona) => persona.usuarios)
    @JoinColumn({ name: 'Personas_UUID' })
    persona: Persona;

    @Column({ name: 'Nivel', nullable: false })
    nivel: number;
}
