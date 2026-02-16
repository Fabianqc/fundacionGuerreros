"use client";

import { useState } from "react";
import { User, Phone, MapPin, Mail, Calendar } from "lucide-react";
import AddressAutocomplete from "./AddressAutocomplete";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
interface PersonFormProps {
    initialData?: {
        cedula?: string;
        tipoCedula?: string;
    };
    onSubmit: (data: CreatePersonaInterface) => void;
    onCancel: () => void;
}

export default function PersonForm({ initialData, onSubmit, onCancel }: PersonFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreatePersonaInterface>({
        fullname: "",
        tipo_cedula: initialData?.tipoCedula || "V",
        cedula: initialData?.cedula || "",
        telefono: "",
        nacimiento: new Date(),
        sexo: "", // Changed from genero to match schema implication or keep consistent
        direccion: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(formData);
        try {
            if (!formData.fullname || !formData.telefono || !formData.nacimiento || !formData.sexo || !formData.direccion) {
                setError("Todos los campos son obligatorios");
                return;
            }
            const data: CreatePersonaInterface = {
                fullname: formData.fullname,
                tipo_cedula: formData.tipo_cedula,
                cedula: formData.cedula,
                telefono: formData.telefono,
                nacimiento: new Date(formData.nacimiento),
                sexo: formData.sexo,
                direccion: formData.direccion,
                email: formData.email
            }

            const response = await axiosClientInstance.post("/personas", data);
            onSubmit(response.data);
        } catch (error) {
            setError(handleAxiosError(error));
            console.log(error);
        } finally {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
                <h3 className="text-sm font-semibold text-purple-900 mb-1">Registrar Nueva Persona</h3>
                <p className="text-xs text-purple-600">La cédula ingresada no existe. Por favor registre los datos básicos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Documento de Identidad</label>
                    <div className="flex gap-2">
                        <select
                            name="tipo_cedula"
                            value={formData.tipo_cedula}
                            onChange={handleChange}
                            className="w-20 px-2 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
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
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium cursor-not-allowed"
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
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md shadow-purple-200 transition-all"
                >
                    Guardar Persona
                </button>
            </div>
        </form>
    );
}
