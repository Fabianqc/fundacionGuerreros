import { useFormContext } from "react-hook-form";
import { PatientFormValues } from "../../schemas/patientSchema";
import AddressAutocomplete from "../AddressAutocomplete";

export default function ClinicalDataSection() {
  const { register, setValue, watch } = useFormContext<PatientFormValues>();

  const lugarNacimiento = watch("lugarNacimiento");

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="pb-3 border-b border-gray-50 mb-2">
        <h3 className="font-semibold text-gray-800">
          Datos Clínicos del Paciente
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Estado Civil
          </label>
          <select
            {...register("estadoCivil")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          >
            <option value="">Seleccionar</option>
            <option value="SOLTERO">Soltero</option>
            <option value="CASADO">Casado</option>
            <option value="DIVORCIADO">Divorciado</option>
            <option value="VIUDO">Viudo</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Grado de Instrucción
          </label>
          <select
            {...register("gradoInstruccion")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          >
            <option value="">Seleccionar</option>
            <option value="Sin Instrucción">Sin Instrucción</option>
            <option value="Básica Incompleta">Básica Incompleta</option>
            <option value="Básica Completa">Básica Completa</option>
            <option value="Bachiller">Bachiller</option>
            <option value="Técnico Medio">Técnico Medio</option>
            <option value="Técnico Superior">Técnico Superior</option>
            <option value="Universitario Incompleto">
              Universitario Incompleto
            </option>
            <option value="Universitario Completo">
              Universitario Completo
            </option>
            <option value="Postgrado">Postgrado</option>
            <option value="Doctorado">Doctorado</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Lugar y País de Nacimiento
          </label>
          <div className="relative">
            <AddressAutocomplete
              value={lugarNacimiento || ""}
              onChange={(val) => setValue("lugarNacimiento", val)}
              onSelectFull={(address) => {
                const country = address.address?.country || "";
                setValue("lugarNacimiento", address.display_name);
                setValue("paisNacimiento", country);
              }}
              placeholder="Buscar ciudad de nacimiento..."
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Ocupación</label>
          <input
            type="text"
            {...register("ocupacion")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Profesión</label>
          <input
            type="text"
            {...register("profesion")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            Salario Mensual
          </label>
          <input
            type="text"
            {...register("salarioMensual")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="space-y-1 flex items-center pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("carnetPatria")}
              className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">
              ¿Tiene Carnet de la Patria?
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700">
          Tipo de Solicitud
        </label>
        <textarea
          {...register("tipoDeSolicitud")}
          rows={2}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700">Alérgico a</label>
        <input
          type="text"
          {...register("alergico")}
          placeholder="N/A si no aplica"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
        />
      </div>
    </div>
  );
}
