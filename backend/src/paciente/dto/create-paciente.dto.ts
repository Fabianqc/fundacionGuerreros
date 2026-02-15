import { IsString, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { EstadoCivil, GradoInstruccion } from "../entities/paciente.entity";

export class CreatePacienteDto {
        @IsString({ message: "La cedula debe ser una cadena de texto" })
        @IsNotEmpty({ message: "La cedula no puede estar vacia" })
        cedula: string;

        @IsString({ message: "El tipo de cedula debe ser una cadena de texto" })
        @IsNotEmpty({ message: "El tipo de cedula no puede estar vacio" })
        tipo_cedula: string;

        @IsEnum(EstadoCivil, { message: "El estado civil debe ser un valor válido" })
        @IsOptional()
        estadoCivil: EstadoCivil;

        @IsString({ message: "El lugar de nacimiento debe ser una cadena de texto" })
        @IsOptional()
        lugarNacimiento: string;

        @IsString({ message: "El pais de nacimiento debe ser una cadena de texto" })
        @IsOptional()
        paisNacimiento: string;

        @IsString({ message: "La ocupacion debe ser una cadena de texto" })
        @IsOptional()
        ocupacion: string;

        @IsEnum(GradoInstruccion, { message: "El grado de instruccion debe ser un valor válido" })
        @IsOptional()
        gradoInstruccion: GradoInstruccion;

        @IsString({ message: "La profesion debe ser una cadena de texto" })
        @IsOptional()
        profesion: string;

        @IsString({ message: "El salario mensual debe ser una cadena de texto" })
        @IsOptional()
        salarioMensual: string;

        @IsBoolean({ message: "El carnet de la patria debe ser un booleano" })
        @IsOptional()
        carnetPatria: boolean;

        @IsString({ message: "El tipo de solicitud debe ser una cadena de texto" })
        @IsOptional()
        tipoDeSolicitud: string;

        @IsString({ message: "Alergico debe ser una cadena de texto" })
        @IsOptional()
        alergico: string;

        @IsString({ message: "El tipo de vivienda debe ser una cadena de texto" })
        @IsOptional()
        tipoVivienda: string;

        @IsString({ message: "La descripcion de la vivienda debe ser una cadena de texto" })
        @IsOptional()
        descripcionVivienda: string;

        @IsNumber()
        @IsOptional()
        nHabitaciones: number;

        @IsNumber()
        @IsOptional()
        nBanos: number;

        @IsBoolean({ message: "La cocina debe ser un booleano" })
        @IsOptional()
        cocina: boolean;

        @IsBoolean({ message: "La sala comedor debe ser un booleano" })
        @IsOptional()
        salaComedor: boolean;

        @IsString({ message: "La tenencia de la vivienda debe ser una cadena de texto" })
        @IsOptional()
        tenenciaVivienda: string;

        @IsString({ message: "Las observaciones deben ser una cadena de texto" })
        @IsOptional()
        observaciones: string;

}
