import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import * as crypto from "crypto";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity('Personas')
export class Persona {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    @Exclude()
    id: crypto.UUID;

    @Column({ name: 'Fullname', nullable: false, type: 'varchar', length: 150 })
    fullname: string;

    @Column({ name: 'Cedula', nullable: false, type: 'varchar', length: 12 })
    cedula: string;

    @Column({ name: 'Tipo_Cedula', nullable: false, type: 'enum', enum: ['V', 'E', 'G', 'J', 'P'] })
    tipo_cedula: string;

    @Column({ name: 'Telefono', nullable: false })
    telefono: string;

    @Column({ name: 'Nacimiento', nullable: false })
    nacimiento: Date;

    @Column({ name: 'Sexo', nullable: false, type: 'enum', enum: ['M', 'F'] })
    sexo: string;

    @Column({ name: 'Direccion', nullable: false })
    direccion: string;

    @OneToMany(() => Usuario, (usuario) => usuario.persona)
    usuarios: Usuario[];

}
