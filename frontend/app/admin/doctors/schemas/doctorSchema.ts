import { z } from "zod";

export const doctorSchema = z.object({
  tipo_cedula: z.string().min(1, "Tipo de cédula es requerido"),
  ci_doctor: z.string().min(1, "La cédula es requerida"),
  licenseNumber: z.string().min(1, "El N° de Colegio es requerido"),
  status: z.enum(["Activo", "Inactivo"]),
  especialidades: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos una especialidad"),
  horarios: z.any().optional(), // Handles the complex ScheduleData type
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;
