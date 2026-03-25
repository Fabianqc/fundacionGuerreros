import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PatientFormValues } from "../../schemas/patientSchema";

const HOUSING_OPTIONS = ["QUINTA", "APTO", "CASA", "RANCHO"];
const TENENCIA_OPTIONS = ["PROPIA", "ALQUILADA", "CEDIDA", "PRESTADA"];

export default function HousingDataSection() {
  const { register, watch, setValue } = useFormContext<PatientFormValues>();

  const tipoVivienda = watch("tipoVivienda");
  const tenenciaVivienda = watch("tenenciaVivienda");

  const [isCustomHousing, setIsCustomHousing] = useState(
    () => !!(tipoVivienda && !HOUSING_OPTIONS.includes(tipoVivienda)),
  );
  const [isCustomTenencia, setIsCustomTenencia] = useState(
    () => !!(tenenciaVivienda && !TENENCIA_OPTIONS.includes(tenenciaVivienda)),
  );

  // Sync custom flags when form is reset with external data
  if (
    tipoVivienda &&
    !HOUSING_OPTIONS.includes(tipoVivienda) &&
    !isCustomHousing
  ) {
    setIsCustomHousing(true);
  }
  if (
    tenenciaVivienda &&
    !TENENCIA_OPTIONS.includes(tenenciaVivienda) &&
    !isCustomTenencia
  ) {
    setIsCustomTenencia(true);
  }

  const handleHousingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "OTRO") {
      setIsCustomHousing(true);
      setValue("tipoVivienda", "");
    } else {
      setIsCustomHousing(false);
      setValue("tipoVivienda", val);
    }
  };

  const handleTenenciaSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "OTRO") {
      setIsCustomTenencia(true);
      setValue("tenenciaVivienda", "");
    } else {
      setIsCustomTenencia(false);
      setValue("tenenciaVivienda", val);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Tipo de Vivienda
          </label>
          <div className="space-y-2">
            <select
              value={
                isCustomHousing
                  ? "OTRO"
                  : HOUSING_OPTIONS.includes(tipoVivienda || "")
                    ? tipoVivienda
                    : ""
              }
              onChange={handleHousingSelect}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
            >
              <option value="">Seleccionar</option>
              {HOUSING_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="OTRO">OTRO</option>
            </select>

            {isCustomHousing && (
              <input
                type="text"
                {...register("tipoVivienda")}
                placeholder="Especifique otro tipo de vivienda"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none animate-fadeIn"
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Tenencia</label>
          <div className="space-y-2">
            <select
              value={
                isCustomTenencia
                  ? "OTRO"
                  : TENENCIA_OPTIONS.includes(tenenciaVivienda || "")
                    ? tenenciaVivienda
                    : ""
              }
              onChange={handleTenenciaSelect}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
            >
              <option value="">Seleccionar</option>
              {TENENCIA_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="OTRO">OTRO</option>
            </select>

            {isCustomTenencia && (
              <input
                type="text"
                {...register("tenenciaVivienda")}
                placeholder="Especifique tenencia"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none animate-fadeIn"
                autoFocus
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-gray-700">
          Descripción Vivienda
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">
              N° de Hab.
            </label>
            <input
              type="number"
              min="0"
              {...register("nHabitaciones", { valueAsNumber: true })}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">
              N° de Baños
            </label>
            <input
              type="number"
              min="0"
              {...register("nBanos", { valueAsNumber: true })}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4 items-center pl-2">
            <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
              <input
                type="checkbox"
                {...register("cocina")}
                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Cocina</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
              <input
                type="checkbox"
                {...register("salaComedor")}
                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Sala/Comed</span>
            </label>
          </div>

          <div className="col-span-2 md:col-span-4 mt-2">
            <input
              type="text"
              {...register("descripcionVivienda")}
              placeholder="Otro: (Especifique detalles adicionales)"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1 pt-2">
        <label className="text-xs font-medium text-gray-700">
          Observaciones
        </label>
        <textarea
          {...register("observaciones")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
        />
      </div>
    </div>
  );
}
