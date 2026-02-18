"use client";

import { useState, useEffect } from "react";
import { Save, Stethoscope, Award, Calendar, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import DoctorSchedule, { ScheduleData } from "./DoctorSchedule";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useNotification } from "@/app/context/NotificationContext";
import { CreateDoctorInterface } from "@/types/create-doctor.interface";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";

interface DoctorFormProps {
    onSubmit: (data: CreateDoctorInterface) => void;
    onCancel: () => void;
    initialData?: CreatePersonaInterface;
    submitLabel?: string;
}

export default function DoctorForm({ onSubmit, onCancel, initialData, submitLabel = "Registrar Doctor" }: DoctorFormProps) {
    const [activeSection, setActiveSection] = useState<"info" | "schedule">("info");
    const [especialidadesList, setEspecialidadesList] = useState<string[]>([]);
    const [currentSpecialty, setCurrentSpecialty] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { addNotification } = useNotification();

    // Doctor Basic Data
    const [doctorData, setDoctorData] = useState<CreateDoctorInterface>({
        tipo_cedula: "",
        ci_doctor: "",
        licenseNumber: "",
        status: "Activo",
        especialidades: [],
        horarios: [],
    });

    // Schedule Data
    const [scheduleData, setScheduleData] = useState<ScheduleData>({
        type: 'weekly'
    } as ScheduleData);

    useEffect(() => {
        console.log(initialData);
        if (initialData) {
            setDoctorData(prev => ({
                ...prev,
                ci_doctor: initialData.cedula,
                tipo_cedula: initialData.tipo_cedula
            }));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSpecialty(e.target.value);
    };

    const handleAddSpecialty = () => {
        if (currentSpecialty && !doctorData.especialidades.includes(currentSpecialty)) {
            setDoctorData(prev => ({
                ...prev,
                especialidades: [...prev.especialidades, currentSpecialty]
            }));
            setCurrentSpecialty(""); // Reset dropdown
        }
    };

    const handleRemoveSpecialty = (specToRemove: string) => {
        setDoctorData(prev => ({
            ...prev,
            especialidades: prev.especialidades.filter(s => s !== specToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(doctorData);
        const data = axiosClientInstance.post("/doctor", doctorData);
        console.log(data);
        onSubmit({
            ...doctorData,
            horarios: []
            //EL NOMBRE DE LA VARIABLE DE HORARIOS ES scheduleData
        });
    };
    const fetchEspecialidades = async () => {
        try {
            const response = await axiosClientInstance.get("/especialidades");
            setEspecialidadesList(response.data.map((especialidad: any) => especialidad.nombre));
        } catch (error) {
            handleAxiosError(error);
        }
    };
    useEffect(() => {

        fetchEspecialidades();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-fadeIn flex flex-col min-h-[500px]">
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
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveSection("schedule")}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeSection === "schedule" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Horario de Atención
                    </div>
                    {activeSection === "schedule" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full" />
                    )}
                </button>
            </div>

            {/* Content Body */}
            <div className="flex-1">
                {activeSection === "info" && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-700">Especialidades</label>
                                <div className="flex gap-2">
                                    <select
                                        name="currentSpecialty"
                                        value={currentSpecialty}
                                        onChange={handleSpecialtyChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                                    >
                                        <option value="">Seleccionar Especialidad</option>
                                        {especialidadesList.map((especialidad) => (
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
                                {/* Selected Specialties Badges */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {doctorData.especialidades?.map((spec: string) => (
                                        <span key={spec} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
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
                                    {(!doctorData.especialidades || doctorData.especialidades.length === 0) && (
                                        <span className="text-xs text-gray-400 italic">Ninguna especialidad seleccionada</span>
                                    )}
                                </div>
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
                    </motion.div>
                )}

                {activeSection === "schedule" && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <DoctorSchedule
                            value={scheduleData}
                            onChange={setScheduleData}
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
                            onClick={() => setActiveSection("schedule")}
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
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {submitLabel}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
