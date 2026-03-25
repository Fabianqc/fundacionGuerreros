"use client";

import { useEffect } from "react";
import { Save } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreatePacienteInterface } from "@/types/create-paciente.interface";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotificationStore } from "@/app/store/useNotificationStore";

import { patientSchema, PatientFormValues } from "../schemas/patientSchema";
import ClinicalDataSection from "./form-sections/ClinicalDataSection";
import HousingDataSection from "./form-sections/HousingDataSection";
import FamilyNucleusSection from "./form-sections/FamilyNucleusSection";

interface PatientFormProps {
  onSubmit: (data: CreatePacienteInterface) => void;
  onCancel: () => void;
  initialData: CreatePersonaInterface;
}

export default function PatientForm({
  onSubmit,
  onCancel,
  initialData,
}: PatientFormProps) {
  const isNewPatient = !initialData?.cedula;
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const methods = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      cedula: initialData?.cedula || "",
      tipo_cedula: initialData?.tipo_cedula || "V",
      nHabitaciones: 0,
      nBanos: 0,
      cocina: false,
      salaComedor: false,
      carnetPatria: false,
      nucleoFamiliar: [],
    },
  });

  const { data: fetchedData, isLoading: isLoadingPatient } = useQuery({
    queryKey: ["patient", initialData?.cedula, initialData?.tipo_cedula],
    queryFn: async () => {
      const response = await axiosClientInstance.get(
        `/paciente/${initialData.cedula}/${initialData.tipo_cedula}`,
      );
      return response.data;
    },
    enabled: !isNewPatient,
  });

  useEffect(() => {
    if (fetchedData) {
      const personaData = fetchedData.persona || fetchedData;
      const mappedFamiliares =
        fetchedData.nucleoFamiliar?.map(
          (rel: {
            id: string;
            parentesco: string;
            persona: {
              id?: string;
              UUID?: string;
              uuid?: string;
              [key: string]: unknown;
            };
          }) => ({
            id: rel.id,
            personaId: rel.persona.id || rel.persona.UUID || rel.persona.uuid,
            persona: rel.persona,
            parentesco: rel.parentesco,
          }),
        ) || [];

      methods.reset({
        cedula: personaData?.cedula || methods.getValues("cedula"),
        tipo_cedula:
          personaData?.tipo_cedula || methods.getValues("tipo_cedula"),
        estadoCivil: fetchedData.estadoCivil || "",
        lugarNacimiento: fetchedData.lugarNacimiento || "",
        paisNacimiento: fetchedData.paisNacimiento || "",
        ocupacion: fetchedData.ocupacion || "",
        gradoInstruccion: fetchedData.gradoInstruccion || "",
        profesion: fetchedData.profesion || "",
        salarioMensual: fetchedData.salarioMensual || "",
        carnetPatria: fetchedData.carnetPatria || false,
        tipoDeSolicitud: fetchedData.tipoDeSolicitud || "",
        alergico: fetchedData.alergico || "",
        tipoVivienda: fetchedData.tipoVivienda || "",
        descripcionVivienda: fetchedData.descripcionVivienda || "",
        nHabitaciones: fetchedData.nHabitaciones || 0,
        nBanos: fetchedData.nBanos || 0,
        cocina: fetchedData.cocina || false,
        salaComedor: fetchedData.salaComedor || false,
        tenenciaVivienda: fetchedData.tenenciaVivienda || "",
        observaciones: fetchedData.observaciones || "",
        nucleoFamiliar: mappedFamiliares,
      });
    }
  }, [fetchedData, methods]);

  const mutation = useMutation({
    mutationFn: async (submissionData: Record<string, unknown>) => {
      if (isNewPatient) {
        return await axiosClientInstance.post("/paciente", submissionData);
      } else {
        return await axiosClientInstance.patch(
          `/paciente/${initialData?.cedula}/${initialData?.tipo_cedula}`,
          submissionData,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({
        queryKey: ["patient", initialData?.cedula, initialData?.tipo_cedula],
      });

      addNotification(
        "success",
        isNewPatient
          ? "Paciente registrado exitosamente"
          : "Información actualizada correctamente",
      );

      // Reconstruct minimal object to pass up to parent based on interface
      onSubmit(methods.getValues() as unknown as CreatePacienteInterface);
      onCancel();
    },
    onError: (error) => {
      const errorMessage = handleAxiosError(error);
      addNotification("error", errorMessage);
    },
  });

  const handleFormSubmit = methods.handleSubmit((data) => {
    // Prepare submission data by stripping nulls and temporary UI objects
    const submissionData: Record<string, unknown> = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (value === "") return [key, null];
        return [key, value];
      }),
    );

    if (data.nucleoFamiliar) {
      submissionData.nucleoFamiliar = data.nucleoFamiliar.map((f) => ({
        personaId: f.personaId,
        parentesco: f.parentesco,
      }));
    }

    mutation.mutate(submissionData);
  });

  if (isLoadingPatient) {
    return (
      <div className="p-8 text-center text-gray-500">
        Cargando datos del paciente...
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm animate-fadeIn"
      >
        <ClinicalDataSection />

        <HousingDataSection />

        <FamilyNucleusSection />

        <div className="pt-6 flex justify-end gap-3 border-t border-gray-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            disabled={mutation.isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {mutation.isPending ? "Guardando..." : "Guardar Ficha"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
