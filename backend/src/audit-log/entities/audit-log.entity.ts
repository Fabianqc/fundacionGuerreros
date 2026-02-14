import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
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

    @ManyToOne(() => Usuario, (usuario) => usuario.auditLogs)
    @JoinColumn({ name: 'Usuario_UUID' })
    usuario: Usuario;

    @Column({ name: "Accion", type: 'enum', enum: Action })
    accion: Action;

    @Column({ name: "TablaAfectada", length: 100 })
    tabla_afectada: string;

    @Column({ name: "RegistroUUID"})
    registro_uuid: crypto.UUID;

    @Column({ name: "DatosAnteriores", type: 'json' })
    datos_anteriores: string;

    @Column({ name: "DatosNuevos", type: 'json' })
    datos_nuevos: string;

    @Column({ name: "Fecha", type: 'timestamp with time zone' })
    fecha: Date;
}
