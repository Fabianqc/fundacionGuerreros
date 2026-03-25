import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { UserPlus, Trash2 } from "lucide-react";
import AddFamilyMemberModal from "../AddFamilyMemberModal";
import { PatientFormValues } from "../../schemas/patientSchema";
import { useNotificationStore } from "@/app/store/useNotificationStore";

export default function FamilyNucleusSection() {
  const { control } = useFormContext<PatientFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "nucleoFamiliar",
  });

  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  useNotificationStore();

  const handleAddFamilySuccess = (member: {
    persona: {
      id?: string;
      UUID?: string;
      uuid?: string;
      fullname?: string;
      cedula?: string;
      tipo_cedula?: string;
    };
    parentesco: string;
  }) => {
    append({
      personaId:
        member.persona.id ?? member.persona.UUID ?? member.persona.uuid ?? "",
      parentesco: member.parentesco,
      persona: member.persona,
    });
  };

  const handleDeleteFamiliar = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Núcleo Familiar</h3>
        <button
          type="button"
          onClick={() => setIsFamilyModalOpen(true)}
          className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Agregar Familiar
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-50/50">
          <UserPlus className="w-8 h-8 opacity-20" />
          <span className="text-sm">No hay familiares registrados</span>
        </div>
      ) : (
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50 outline-none hover:border-purple-200 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {field.persona?.fullname ||
                    field.persona?.FullName ||
                    field.persona?.fullName ||
                    field.persona?.Fullname}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                  <span>
                    C.I:{" "}
                    {field.persona?.tipo_cedula || field.persona?.Tipo_Cedula}-
                    {field.persona?.cedula || field.persona?.Cedula}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    {field.parentesco}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteFamiliar(idx)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <AddFamilyMemberModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        onSuccess={handleAddFamilySuccess}
      />
    </div>
  );
}
