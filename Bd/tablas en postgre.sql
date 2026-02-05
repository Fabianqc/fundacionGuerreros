-- 1. Crear el esquema
DROP SCHEMA IF EXISTS mydb CASCADE;
CREATE SCHEMA IF NOT EXISTS mydb;
SET search_path TO mydb;

-- 2. Habilitar extensión para generar UUIDs (Opcional pero recomendado)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Definición de ENUMs (Tipos de datos personalizados)
CREATE TYPE accion_enum AS ENUM ('CREAR', 'ACTUALIZAR', 'ELIMINAR');

CREATE TYPE estado_civil_enum AS ENUM ('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO');

CREATE TYPE grado_instruccion_enum AS ENUM (
    'Sin instrucción', 'Primaria Incompleta', 'Primaria Completa', 
    'Secundaria Incompleta', 'Secundaria Completa', 'Técnico Medio', 
    'TSU', 'Universitario Incompleto', 'Universitario Completo', 
    'Postgrado', 'Doctorado'
);

CREATE TYPE parentesco_enum AS ENUM (
    'MADRE', 'PADRE', 'ESPOSO', 'ESPOSA', 'CONCUBINO', 'CONCUBINA', 
    'HIJO', 'HIJA', 'HERMANO', 'HERMANA', 'ABUELO', 'ABUELA', 
    'NIETO', 'NIETA', 'TIO', 'TIA', 'SOBRINO', 'SOBRINA', 
    'PRIMO', 'PRIMA', 'SUEGRO', 'SUEGRA', 'YERNO', 'NUERA', 
    'CUÑADO', 'CUÑADA', 'TUTOR_LEGAL', 'OTRO'
);

CREATE TYPE tipo_cedula_enum AS ENUM ('E', 'V', 'G', 'J', 'P');


-- -----------------------------------------------------
-- Table "AuditLog"
-- -----------------------------------------------------
CREATE TABLE "AuditLog" (
  "UUID" UUID NOT NULL,
  "Usuario_UUID" UUID NOT NULL,
  "Accion" accion_enum NOT NULL,
  "TablaAfectada" VARCHAR(50) NULL,
  "RegistroUUID" UUID NULL,
  "DatosAnteriores" JSONB NULL,
  "DatosNuevos" JSONB NULL,
  "Fecha" TIMESTAMPTZ NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("UUID", "Usuario_UUID")
);

-- -----------------------------------------------------
-- Table "AyudasTecnicas"
-- -----------------------------------------------------
CREATE TABLE "AyudasTecnicas" (
  "UUID" UUID NOT NULL,
  "Usuario_UUID" UUID NOT NULL,
  "Observacion" VARCHAR(500) NULL,
  "Fecha" DATE NOT NULL,
  "TipoAdyuda_UUID" UUID NOT NULL, -- Corregido de BINARY(64) a UUID
  "Paciente_UUID" UUID NOT NULL,
  PRIMARY KEY ("UUID", "Usuario_UUID", "TipoAdyuda_UUID", "Paciente_UUID")
);

-- -----------------------------------------------------
-- Table "Consulta"
-- -----------------------------------------------------
CREATE TABLE "Consulta" (
  "UUID" UUID NOT NULL,
  "Fecha" DATE NOT NULL,
  "Usuario_UUID" UUID NOT NULL,
  "Observacion" VARCHAR(500) NULL,
  "Paciente_UUID" UUID NOT NULL,
  "Doctor_UUID" UUID NOT NULL,
  PRIMARY KEY ("UUID", "Usuario_UUID", "Paciente_UUID", "Doctor_UUID")
);

-- -----------------------------------------------------
-- Table "Consulta_has_Patologia"
-- -----------------------------------------------------
CREATE TABLE "Consulta_has_Patologia" (
  "Consulta_UUID" UUID NOT NULL,
  "Patologia_UUID" UUID NOT NULL,
  PRIMARY KEY ("Consulta_UUID", "Patologia_UUID")
);

-- -----------------------------------------------------
-- Table "Doctor"
-- -----------------------------------------------------
CREATE TABLE "Doctor" (
  "UUID" UUID NOT NULL,
  "Personas_UUID" UUID NOT NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "Doctor_has_Especialidades"
-- -----------------------------------------------------
CREATE TABLE "Doctor_has_Especialidades" (
  "Doctor_UUID" UUID NOT NULL,
  "Especialidades_UUID" UUID NOT NULL,
  PRIMARY KEY ("Doctor_UUID", "Especialidades_UUID")
);

-- -----------------------------------------------------
-- Table "Especialidades"
-- -----------------------------------------------------
CREATE TABLE "Especialidades" (
  "UUID" UUID NOT NULL,
  "Espacialidad" VARCHAR(100) NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "IMG"
-- -----------------------------------------------------
CREATE TABLE "IMG" (
  "UUID" UUID NOT NULL,
  "Ruta" VARCHAR(100) NOT NULL,
  "Consulta_UUID" UUID NOT NULL,
  PRIMARY KEY ("UUID", "Consulta_UUID")
);

-- -----------------------------------------------------
-- Table "NucleoFamiliar"
-- -----------------------------------------------------
CREATE TABLE "NucleoFamiliar" (
  "Paciente_UUID" UUID NOT NULL,
  "Personas_UUID" UUID NOT NULL,
  "Parentesco" parentesco_enum NOT NULL,
  PRIMARY KEY ("Paciente_UUID", "Personas_UUID")
);

-- -----------------------------------------------------
-- Table "Paciente"
-- -----------------------------------------------------
CREATE TABLE "Paciente" (
  "UUID" UUID NOT NULL,
  "Personas_UUID" UUID NOT NULL,
  "EstadoCivil" estado_civil_enum NULL,
  "LugarNacimiento" VARCHAR(100) NULL,
  "PaisNacimiento" VARCHAR(100) NULL,
  "Ocupacion" VARCHAR(100) NULL,
  "GradoInstruccion" grado_instruccion_enum NULL,
  "Profesion" VARCHAR(100) NULL,
  "Salario Mensual" VARCHAR(45) NULL,
  "CarnetPatria" BOOLEAN NULL DEFAULT FALSE, -- Cambiado TINYINT a BOOLEAN
  "TipoDeSolicitud" VARCHAR(1000) NULL,
  "Alergico" VARCHAR(1000) NULL DEFAULT '0',
  "TipoVivienda" VARCHAR(100) NULL,
  "DescripcionVIvienda" VARCHAR(100) NULL,
  "TenenciaVivienda" VARCHAR(100) NULL,
  "Observaciones" VARCHAR(1000) NULL,
  "Usuario_UUID" UUID NOT NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "Patologia"
-- -----------------------------------------------------
CREATE TABLE "Patologia" (
  "UUID" UUID NOT NULL,
  "Name" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "Personas"
-- -----------------------------------------------------
CREATE TABLE "Personas" (
  "UUID" UUID NOT NULL,
  "FullName" VARCHAR(150) NOT NULL,
  "Cedula" VARCHAR(45) NOT NULL,
  "Tipo_Cedula" tipo_cedula_enum NOT NULL,
  "Telefono" VARCHAR(45) NOT NULL,
  "Tipo" VARCHAR(45) NULL,
  "Nacimiento" DATE NOT NULL,
  "Direccion" VARCHAR(45) NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "TipoAdyuda"
-- -----------------------------------------------------
CREATE TABLE "TipoAdyuda" (
  "UUID" UUID NOT NULL,
  "Name" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("UUID")
);

-- -----------------------------------------------------
-- Table "Usuario"
-- -----------------------------------------------------
CREATE TABLE "Usuario" (
  "UUID" UUID NOT NULL,
  "UserName" VARCHAR(100) NOT NULL,
  "Pashash" BYTEA NOT NULL, -- Hash de contraseña en binario
  "Nivel" INT NOT NULL,
  "Email" VARCHAR(100) NOT NULL,
  "Personas_UUID" UUID NOT NULL,
  "Status" VARCHAR(45) NULL,
  PRIMARY KEY ("UUID", "Personas_UUID")
);