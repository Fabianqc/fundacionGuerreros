import { IsDate, IsNotEmpty, IsString, MinLength, MaxLength, minLength } from "class-validator";

export class CreatePersonaDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(1, { message: 'El nombre debe tener al menos 1 caracteres' })
    @MaxLength(150, { message: 'El nombre debe tener como maximo 150 caracteres' })
    fullname: string;

    @IsString({ message: 'La cedula debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La cedula es requerida' })
    @MinLength(6, { message: 'La cedula debe tener al menos 6 caracteres' })
    @MaxLength(12, { message: 'La cedula debe tener como maximo 12 caracteres' })
    cedula: string;

    @IsString({ message: 'El tipo de cedula debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo de cedula es requerido' })
    tipo_cedula: string;

    @IsString({ message: 'El telefono debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El telefono es requerido' })
    telefono: string;

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    nacimiento: Date;

    @IsString({ message: 'El sexo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El sexo es requerido' })
    sexo: string;

    @IsString({ message: 'La direccion debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La direccion es requerida' })
    direccion: string;
}
