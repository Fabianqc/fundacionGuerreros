"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import PersonForm from "../../patients/components/PersonForm"; // Reusing PersonForm
import DoctorForm from "./DoctorForm";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotification } from "@/app/context/NotificationContext";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { CreateDoctorInterface } from "@/types/create-doctor.interface";

interface DoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

type SearchStatus = "idle" | "searching" | "found" | "not-found";

export default function DoctorModal({ isOpen, onClose, onSubmit, initialData }: DoctorModalProps) {
    const [cedula, setCedula] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [personData, setPersonData] = useState<any>(null);
    const { addNotification } = useNotification();
    const [error, setError] = useState<string | null>(null);
    // Initial Data Handler (For Editing)
    useEffect(() => {
        if (initialData && isOpen) {
            // Pre-fill data logic simulating a "Found" state
            setPersonData({
                fullName: initialData.fullName || initialData.fullname,
                fullname: initialData.fullName || initialData.fullname, // Keep both for consistency if needed
                cedula: initialData.cedula,
                phone: initialData.phone,
                email: initialData.email,
                id: "existing-id"
            });
            setCedula(initialData.cedula?.split('-')[1] || "");
            setTipoCedula(initialData.cedula?.split('-')[0] || "V");
            setSearchStatus("found");
        } else if (!isOpen) {
            // Reset on close
            setSearchStatus("idle");
            setPersonData(null);
            setCedula("");
        }
    }, [initialData, isOpen]);

    const handleSearch = async () => {
        if (!cedula || !tipoCedula) return;
        setSearchStatus("searching");

        try {
            const response = await axiosClientInstance.get(`/personas/${tipoCedula}/${cedula}`);
            console.log(response.data);

            if (response.data) {
                setPersonData(response.data);
                setSearchStatus("found");
            } else {
                setSearchStatus("not-found");
            }
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            setError(errorMessage);
            addNotification("error", errorMessage);
            setPersonData({} as CreatePersonaInterface);
            setSearchStatus("not-found");
        }
    };

    const handlePersonSubmit = (data: any) => {
        setSearchStatus("found");
    };

    const handleSubmitDoctor = (doctorSpecificData: CreateDoctorInterface) => {
        axiosClientInstance.post("/doctores", doctorSpecificData)
            .then((response) => {
                addNotification("success", "Doctor guardado exitosamente");

                // Construct full doctor object for UI update
                const fullDoctorData = {
                    ...doctorSpecificData,
                    fullName: personData?.fullname || personData?.fullName || "Sin Nombre",
                    cedula: `${doctorSpecificData.tipo_cedula || personData?.tipo_cedula}-${doctorSpecificData.ci_doctor || personData?.cedula}`,
                    phone: personData?.phone || "",
                    email: personData?.email || "",
                    specialities: doctorSpecificData.especialidades || [],
                    id: response.data.id || `temp-${Date.now()}` // Use ID from response or temp
                };

                onSubmit(fullDoctorData);
                onClose();
            })
            .catch((error) => {
                const errorMessage = handleAxiosError(error);
                addNotification("error", errorMessage);
            });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {initialData ? "Editar Doctor" : "Registrar Doctor"}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {initialData ? "Actualice los datos." : "Busque una persona existente o regístrela."}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {/* Search Section */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Buscar Persona (Cédula)
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={tipoCedula}
                                        onChange={(e) => setTipoCedula(e.target.value)}
                                        className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-gray-50/50"
                                        disabled={searchStatus === "found" || !!initialData}
                                    >
                                        <option value="V">V</option>
                                        <option value="E">E</option>
                                        <option value="J">J</option>
                                        <option value="P">P</option>
                                    </select>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Ej: 12345678"
                                            className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            disabled={searchStatus === "found" || !!initialData}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {searchStatus === "searching" && (
                                                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                                            )}
                                            {searchStatus === "found" && (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            )}
                                            {searchStatus === "not-found" && (
                                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={!cedula || searchStatus === "searching" || searchStatus === "found" || !!initialData}
                                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Buscar
                                    </button>
                                </div>

                                {/* Status Feedback */}
                                <div className="mt-2 text-sm min-h-[20px]">
                                    {searchStatus === "not-found" && (
                                        <span className="text-orange-600 flex items-center gap-1 animate-fadeIn">
                                            Persona no encontrada. Por favor complete el registro abajo.
                                        </span>
                                    )}
                                    {searchStatus === "found" && personData && (
                                        <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center justify-between">
                                            <div>
                                                <span className="text-green-800 font-medium flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Persona Seleccionada:
                                                </span>
                                                <p className="text-green-700 text-sm mt-1 pl-6">
                                                    {personData.fullname} <span className="text-green-600/70">({personData.tipo_cedula}-{personData.cedula})</span>
                                                </p>
                                            </div>
                                            {!initialData && (
                                                <button
                                                    onClick={() => {
                                                        setSearchStatus("idle");
                                                        setPersonData(null);
                                                    }}
                                                    className="text-xs text-green-600 hover:text-green-800 underline"
                                                >
                                                    Cambiar
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic Forms */}
                            <div className="space-y-6">
                                {/* Case 1: Person NOT Found -> Create Person */}
                                {searchStatus === "not-found" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                    >
                                        <PersonForm
                                            initialData={{ cedula, tipoCedula }}
                                            onSubmit={handlePersonSubmit}
                                            onCancel={() => setSearchStatus("idle")}
                                        />
                                    </motion.div>
                                )}

                                {/* Case 2: Person Found -> Details + Doctor Form */}
                                {searchStatus === "found" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <DoctorForm

                                            onSubmit={handleSubmitDoctor}
                                            onCancel={onClose}
                                            initialData={personData} // Pass initial doctor data if editing
                                            submitLabel={initialData ? "Guardar Cambios" : "Registrar Doctor"}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
