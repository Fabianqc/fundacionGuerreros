import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { NucleoFamiliar } from "../../nucleo-familiar/entities/nucleo-familiar.entity";
import { Consulta } from "../../consulta/entities/consulta.entity";
import { AyudasTecnica } from "../../ayudas-tecnicas/entities/ayudas-tecnica.entity";

export enum EstadoCivil {
    SOLTERO = "SOLTERO",
    CASADO = "CASADO",
    DIVORCIADO = "DIVORCIADO",
    VIUDO = "VIUDO",
}

export enum GradoInstruccion {
    SIN_INSTRUCCION = "Sin instrucción",
    PRIMARIA_INCOMPLETA = "Primaria Incompleta",
    PRIMARIA_COMPLETA = "Primaria Completa",
    SECUNDARIA_INCOMPLETA = "Secundaria Incompleta",
    SECUNDARIA_COMPLETA = "Secundaria Completa",
    TECNICO_MEDIO = "Técnico Medio",
    TSU = "TSU",
    UNIVERSITARIO_INCOMPLETO = "Universitario Incompleto",
    UNIVERSITARIO_COMPLETO = "Universitario Completo",
    POSTGRADO = "Postgrado",
    DOCTORADO = "Doctorado"
}

@Entity('Paciente')
export class Paciente {

    @PrimaryGeneratedColumn('uuid', { name: 'UUID' })
    id: string;

    @ManyToOne(() => Persona)
    @JoinColumn({ name: 'Personas_UUID' })
    persona: Persona;

    @Column({
        type: 'enum',
        enum: EstadoCivil,
        name: 'EstadoCivil',
        nullable: true
    })
    estadoCivil: EstadoCivil;

    @Column({ name: 'LugarNacimient', length: 100, nullable: true })
    lugarNacimiento: string;

    @Column({ name: 'PaisNacimiento', length: 100, nullable: true })
    paisNacimiento: string;

    @Column({ name: 'Ocupacion', length: 100, nullable: true })
    ocupacion: string;

    @Column({
        type: 'enum',
        enum: GradoInstruccion,
        name: 'GradoInstruccio',
        nullable: true
    })
    gradoInstruccion: GradoInstruccion;

    @Column({ name: 'Profesion', length: 100, nullable: true })
    profesion: string;

    @Column({ name: 'Salario Mensual', length: 45, nullable: true })
    salarioMensual: string;

    @Column({ name: 'CarnetPatria', type: 'boolean', default: false, nullable: true })
    carnetPatria: boolean;

    @Column({ name: 'TipoDeSolicitud', length: 1000, nullable: true })
    tipoDeSolicitud: string;

    @Column({ name: 'Alergico', length: 1000, default: '0', nullable: true })
    alergico: string;

    @Column({ name: 'TipoVivienda', length: 100, nullable: true })
    tipoVivienda: string;

    @Column({ name: 'DescripcionVivi', length: 100, nullable: true })
    descripcionVivienda: string;

    @Column({ name: 'TenenciaViviend', length: 100, nullable: true })
    tenenciaVivienda: string;

    @Column({ name: 'Observaciones', length: 1000, nullable: true })
    observaciones: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'Usuario_UUID' })
    usuario: Usuario;

    @OneToMany(() => NucleoFamiliar, (nucleoFamiliar) => nucleoFamiliar.paciente)
    nucleoFamiliar: NucleoFamiliar[];

    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consultas: Consulta[];

    @OneToMany(() => AyudasTecnica, (ayudasTecnica) => ayudasTecnica.paciente)
    ayudasTecnicas: AyudasTecnica[];

}
