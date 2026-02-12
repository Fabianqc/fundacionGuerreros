import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: string;

    @Column({ unique: true, name: 'Email' })
    email: string;

    @Column({ name: 'Pashash' }) // Do not return password by default
    @Exclude()
    password: string;

    @Column({ name: 'Status' })
    status: boolean;
    
    //@ManyToOne(() => Personas)
    @JoinColumn({ name: 'Personas_UUID' })
    uuidPersonas: string;

    @Column({ name: 'Nivel' })
    nivel: number;

    

}
