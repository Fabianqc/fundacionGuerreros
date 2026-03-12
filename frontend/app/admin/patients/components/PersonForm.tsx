"use client";

import { useState, useEffect } from "react";
import { User, Phone, MapPin, Mail, Calendar } from "lucide-react";
import AddressAutocomplete from "./AddressAutocomplete";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface PersonFormProps {
    initialData?: any; // Accepting full person object
    onSubmit: (data: CreatePersonaInterface) => void;
    onCancel: () => void;
}

export default function PersonForm({ initialData, onSubmit, onCancel }: PersonFormProps) {
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);

    const isExisting = !!(initialData?.fullname || initialData?.Fullname || initialData?.fullName || initialData?.FullName);

    const getInitialFormData = (data: any): CreatePersonaInterface => ({
        fullname: data?.fullname || data?.Fullname || data?.fullName || data?.FullName || "",
        tipo_cedula: data?.tipo_cedula || data?.tipoCedula || data?.Tipo_Cedula || "V",
        cedula: data?.cedula || data?.Cedula || "",
        telefono: data?.telefono || data?.Telefono || data?.phone || data?.Phone || "",
        nacimiento: data?.nacimiento ? new Date(data.nacimiento) : (data?.Nacimiento ? new Date(data.Nacimiento) : new Date()),
        sexo: data?.sexo || data?.Sexo || data?.genero || data?.Gender || "",
        direccion: data?.direccion || data?.Direccion || data?.address || data?.Address || "",
        email: data?.email || data?.Email || ""
    });

    const [formData, setFormData] = useState<CreatePersonaInterface>(getInitialFormData(initialData));

    // Sync state when initialData changes (vital for modal reuse)
    useEffect(() => {
        if (initialData) {
            setFormData(getInitialFormData(initialData));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const createPersonaMutation = useMutation({
        mutationFn: async (data: CreatePersonaInterface) => {
            const response = await axiosClientInstance.post("/personas", data);
            return response.data;
        },
        onSuccess: (data) => {
            onSubmit(data);
        },
        onError: (err: any) => {
            setError(handleAxiosError(err));
            console.error(err);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!formData.fullname || !formData.telefono || !formData.nacimiento || !formData.sexo || !formData.direccion) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const data: CreatePersonaInterface = {
            ...formData,
            nacimiento: formData.nacimiento instanceof Date ? formData.nacimiento : new Date(formData.nacimiento)
        };

        if (isExisting) {
            onSubmit(data); // Don't create if it already exists
        } else {
            createPersonaMutation.mutate(data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
            <div className={`p-4 rounded-xl border mb-4 ${isExisting ? "bg-green-50 border-green-100" : "bg-purple-50 border-purple-100"}`}>
                <h3 className={`text-sm font-semibold mb-1 ${isExisting ? "text-green-900" : "text-purple-900"}`}>
                    {isExisting ? "Persona Encontrada" : "Registrar Nueva Persona"}
                </h3>
                <p className={`text-xs ${isExisting ? "text-green-600" : "text-purple-600"}`}>
                    {isExisting 
                        ? "Confirme o actualice los datos de la persona antes de continuar." 
                        : "La cédula ingresada no existe. Por favor registre los datos básicos."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Documento de Identidad</label>
                    <div className="flex gap-2">
                        <select
                            name="tipo_cedula"
                            value={formData.tipo_cedula}
                            onChange={handleChange}
                            disabled={true}
                            className="w-20 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-0 outline-none cursor-not-allowed appearance-none"
                        >
                            <option value="V">V</option>
                            <option value="E">E</option>
                            <option value="J">J</option>
                            <option value="P">P</option>
                            <option value="G">G</option>
                        </select>
                        <div className="relative flex-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="cedula"
                                value={formData.cedula}
                                onChange={handleChange}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium cursor-not-allowed outline-none"
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Fecha de Nacimiento</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            name="nacimiento"
                            value={
                                formData.nacimiento instanceof Date && !isNaN(formData.nacimiento.getTime())
                                    ? formData.nacimiento.toISOString().split('T')[0]
                                    : ""
                            }
                            onChange={(e) => {
                                const dateValue = e.target.valueAsDate || new Date(e.target.value);
                                setFormData(prev => ({ ...prev, nacimiento: dateValue }));
                            }}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-700">Nombre Completo</label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Ej: Juan Carlos Pérez López"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Teléfono</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ej: 0414-1234567"
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Email (Opcional)</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            placeholder="Ej: correo@ejemplo.com"
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Género</label>
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    >
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-700">Dirección</label>
                    <div className="relative">
                        <AddressAutocomplete
                            value={formData.direccion}
                            onChange={(val) => setFormData(prev => ({ ...prev, direccion: val }))}
                            placeholder="Ej: Calle 3, Sector..."
                        />
                    </div>
                </div>
            </div>
            <div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={createPersonaMutation.isPending}
                    className={`px-4 py-2 text-sm text-white rounded-lg transition-all disabled:opacity-50 shadow-md ${
                        isExisting ? "bg-green-600 hover:bg-green-700 shadow-green-200" : "bg-purple-600 hover:bg-purple-700 shadow-purple-200"
                    }`}
                >
                    {createPersonaMutation.isPending ? "Guardando..." : isExisting ? "Confirmar y Continuar" : "Guardar Persona"}
                </button>
            </div>
        </form>
    );
}
