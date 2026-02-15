"use client";

import { useState, useEffect } from "react";
import { Save, Stethoscope, Award } from "lucide-react";

interface DoctorFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
    initialData?: any;
    submitLabel?: string;
}

export default function DoctorForm({ onSubmit, onCancel, initialData, submitLabel = "Registrar Doctor" }: DoctorFormProps) {
    const [doctorData, setDoctorData] = useState({
        speciality: "",
        licenseNumber: "",
        status: "Activo"
    });

    useEffect(() => {
        if (initialData) {
            setDoctorData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(doctorData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm animate-fadeIn">
            <div className="pb-3 border-b border-gray-50 mb-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    Información Profesional
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Especialidad</label>
                    <select
                        name="speciality"
                        value={doctorData.speciality}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                        required
                    >
                        <option value="">Seleccionar Especialidad</option>
                        <option value="Medicina General">Medicina General</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Traumatología">Traumatología</option>
                        <option value="Ginecología">Ginecología</option>
                        <option value="Psicología">Psicología</option>
                        <option value="Diagnóstico">Diagnóstico</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">N° Colegio de Médicos</label>
                    <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="licenseNumber"
                            value={doctorData.licenseNumber}
                            onChange={handleChange}
                            placeholder="Ej: 12345"
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Estado</label>
                    <select
                        name="status"
                        value={doctorData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
