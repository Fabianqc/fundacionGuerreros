"use client";

import { useState, useEffect } from "react";
import { Save, Stethoscope, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DoctorSchedule, { ScheduleData } from "./DoctorSchedule";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import { CreateDoctorInterface } from "@/types/create-doctor.interface";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";

import { doctorSchema, DoctorFormValues } from "../schemas/doctorSchema";
import ProfessionalDataSection from "./form-sections/ProfessionalDataSection";

interface DoctorFormProps {
  onSubmit: (data: CreateDoctorInterface) => void;
  onCancel: () => void;
  initialData?: CreatePersonaInterface;
}

export default function DoctorForm({
  onSubmit,
  onCancel,
  initialData,
}: DoctorFormProps) {
  const [activeSection, setActiveSection] = useState<"info" | "schedule">(
    "info",
  );
  const isEditing = !!initialData;
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  const methods = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      tipo_cedula: initialData?.tipo_cedula || "",
      ci_doctor: initialData?.cedula || "",
      licenseNumber: "",
      status: "Activo",
      especialidades: [],
      horarios: { type: "weekly" } as unknown as ScheduleData,
    },
  });

  // Fetch Doctor Data if editing
  const { data: fetchedDoctor, isLoading: isFetchingDoctor } = useQuery({
    queryKey: ["doctor", initialData?.cedula, initialData?.tipo_cedula],
    queryFn: async () => {
      const { data } = await axiosClientInstance.get(
        `/doctor/${initialData?.tipo_cedula}/${initialData?.cedula}`,
      );
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (fetchedDoctor) {
      methods.reset({
        ci_doctor: initialData?.cedula || "",
        tipo_cedula: initialData?.tipo_cedula || "",
        licenseNumber: fetchedDoctor.licenseNumber,
        status: fetchedDoctor.status,
        especialidades: fetchedDoctor.doctor_especialidades || [],
        horarios: fetchedDoctor.horarios || { type: "weekly" },
      });
    }
  }, [fetchedDoctor, initialData, methods]);

  const saveMutation = useMutation({
    mutationFn: async (data: CreateDoctorInterface) => {
      if (isEditing) {
        return axiosClientInstance.put("/doctor", data);
      } else {
        return axiosClientInstance.post("/doctor", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({
        queryKey: [
          "doctor",
          methods.getValues("ci_doctor"),
          methods.getValues("tipo_cedula"),
        ],
      });

      onSubmit(methods.getValues() as unknown as CreateDoctorInterface);
      addNotification(
        "success",
        isEditing
          ? "Doctor actualizado exitosamente"
          : "Doctor guardado exitosamente",
      );
    },
    onError: (error) => {
      addNotification("error", handleAxiosError(error));
    },
  });

  const handleFormSubmit = methods.handleSubmit((data) => {
    saveMutation.mutate(data as unknown as CreateDoctorInterface);
  });

  const handleNextClick = async () => {
    // Trigger validation for info fields before moving to schedule
    const isValid = await methods.trigger([
      "licenseNumber",
      "status",
      "especialidades",
    ]);
    if (isValid) {
      setActiveSection("schedule");
    }
  };

  return (
    <>
      {isFetchingDoctor ? (
        <div className="mt-10 mb-10 inset-0 bg-white/50 flex items-center justify-center z-50">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-fadeIn flex flex-col min-h-[500px]"
          >
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("info")}
                className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeSection === "info" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Datos Profesionales
                </div>
                {activeSection === "info" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeSection === "schedule" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Horario de Atención
                </div>
                {activeSection === "schedule" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full"
                  />
                )}
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1">
              {activeSection === "info" && <ProfessionalDataSection />}

              {activeSection === "schedule" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DoctorSchedule
                    value={
                      methods.watch("horarios") ?? {
                        type: "weekly" as ScheduleData["type"],
                      }
                    }
                    onChange={(newSchedule) =>
                      methods.setValue("horarios", newSchedule, {
                        shouldValidate: true,
                      })
                    }
                  />
                </motion.div>
              )}
            </div>

            <div className="pt-6 flex justify-between gap-3 border-t border-gray-50 mt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all"
              >
                Cancelar
              </button>
              <div className="flex gap-2">
                {activeSection === "info" ? (
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-sm flex items-center gap-2"
                  >
                    Siguiente: Horario
                    <Calendar className="w-4 h-4" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveSection("info")}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={saveMutation.isPending}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {saveMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saveMutation.isPending
                        ? "Guardando..."
                        : isEditing
                          ? "Actualizar Doctor"
                          : "Registrar Doctor"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}
