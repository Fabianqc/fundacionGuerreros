import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import { Persona } from 'src/personas/entities/persona.entity';
import { Exclude } from 'class-transformer';
import { AuditLog } from 'src/audit-log/entities/audit-log.entity';
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { AyudasTecnica } from 'src/ayudas-tecnicas/entities/ayudas-tecnica.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';


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

    @OneToMany(() => AuditLog, (auditLog) => auditLog.usuario)
    auditLogs: AuditLog[];

    @OneToMany(() => Consulta, (consulta) => consulta.usuario)
    consultas: Consulta[];

    @OneToMany(() => AyudasTecnica, (ayudasTecnica) => ayudasTecnica.usuario)
    ayudasTecnicas: AyudasTecnica[];

    @OneToMany(() => Paciente, (paciente) => paciente.usuario)
    pacientes: Paciente[];
}
