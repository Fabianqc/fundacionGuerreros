import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import crypto from "crypto";
import { Usuario } from "src/usuario/entities/usuario.entity";


enum Action {
    CREATE = 'CREAR',
    UPDATE = 'ACTUALIZAR',
    DELETE = 'ELIMINAR',
}
@Entity('AuditLog')
export class AuditLog {
    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: crypto.UUID;

    @ManyToOne(()=> Usuario, (Usuario) => Usuario.id)
    usuario: Usuario;

    @Column({name:"Accion", length: 100, type: 'enum', enum: Action})
    accion: Action;

    @Column({name:"TablaAfectada", length: 100})
    tabla_afectada: string;

    @Column({name:"RegistroUUID", length: 100})
    registro_uuid: crypto.UUID;

    @Column({name:"DatosAnteriores", type: 'json'})
    datos_anteriores: string;

    @Column({name:"DatosNuevos", type: 'json'})
    datos_nuevos: string;

    @Column({name:"Fecha", type: 'timestamp with time zone'})
    fecha: Date;
}
