import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus, X, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { DoctorFormValues } from "../../schemas/doctorSchema";
import { motion } from "framer-motion";

export default function ProfessionalDataSection() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();
  const [currentSpecialty, setCurrentSpecialty] = useState<string>("");

  const especialidades = watch("especialidades") || [];

  const { data: especialidadesData } = useQuery({
    queryKey: ["especialidades"],
    queryFn: async () => {
      const { data } = await axiosClientInstance.get("/especialidades");
      return data;
    },
  });

  const especialidadesList = especialidadesData
    ? especialidadesData.map((e: { nombre: string }) => e.nombre)
    : [];

  const handleAddSpecialty = () => {
    if (currentSpecialty && !especialidades.includes(currentSpecialty)) {
      setValue("especialidades", [...especialidades, currentSpecialty], {
        shouldValidate: true,
      });
      setCurrentSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specToRemove: string) => {
    setValue(
      "especialidades",
      especialidades.filter((s) => s !== specToRemove),
      { shouldValidate: true },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-gray-700">
            Especialidades
          </label>
          <div className="flex gap-2">
            <select
              value={currentSpecialty}
              onChange={(e) => setCurrentSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
            >
              <option value="">Seleccionar Especialidad</option>
              {especialidadesList.map((especialidad: string) => (
                <option key={especialidad} value={especialidad}>
                  {especialidad}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddSpecialty}
              disabled={!currentSpecialty}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {errors.especialidades && (
            <p className="text-xs text-red-500 mt-1">
              {errors.especialidades.message}
            </p>
          )}

          {/* Selected Specialties Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {especialidades.map((spec: string) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"
              >
                {spec}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(spec)}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {especialidades.length === 0 && !errors.especialidades && (
              <span className="text-xs text-gray-400 italic">
                Ninguna especialidad seleccionada
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            N° Colegio de Médicos
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              {...register("licenseNumber")}
              placeholder="Ej: 12345"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>
          {errors.licenseNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.licenseNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Estado</label>
          <select
            {...register("status")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
