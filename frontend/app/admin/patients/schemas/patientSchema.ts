import { z } from "zod";

export const patientSchema = z.object({
  cedula: z.string().min(1, "La cédula es requerida"),
  tipo_cedula: z.string().min(1, "El tipo de cédula es requerido"),
  estadoCivil: z.string().optional(),
  lugarNacimiento: z.string().optional(),
  paisNacimiento: z.string().optional(),
  ocupacion: z.string().optional(),
  gradoInstruccion: z.string().optional(),
  profesion: z.string().optional(),
  salarioMensual: z.string().optional(),
  carnetPatria: z.boolean().optional(),
  tipoDeSolicitud: z.string().optional(),
  alergico: z.string().optional(),
  tipoVivienda: z.string().optional(),
  descripcionVivienda: z.string().optional(),
  nHabitaciones: z.number().min(0).optional(),
  nBanos: z.number().min(0).optional(),
  cocina: z.boolean().optional(),
  salaComedor: z.boolean().optional(),
  tenenciaVivienda: z.string().optional(),
  observaciones: z.string().optional(),
  nucleoFamiliar: z
    .array(
      z.object({
        id: z.number().or(z.string()).optional(),
        personaId: z.string().uuid("El ID debe ser un UUID válido"),
        parentesco: z.string(),
        persona: z.any().optional(),
      }),
    )
    .optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
