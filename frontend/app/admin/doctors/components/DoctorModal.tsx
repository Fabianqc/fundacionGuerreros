"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import PersonForm from "../../patients/components/PersonForm";
import DoctorForm from "./DoctorForm";
import FormStepper from "@/app/components/ui/FormStepper";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import { useQuery } from "@tanstack/react-query";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { CreateDoctorInterface } from "@/types/create-doctor.interface";

interface DoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

type Step = "search" | "persona" | "specialist";
type SearchStatus = "idle" | "searching" | "found" | "not-found";

const DOCTOR_STEPS = [
    { id: "search", label: "Buscar" },
    { id: "persona", label: "Persona" },
    { id: "specialist", label: "Especialista" }
];

export default function DoctorModal({ isOpen, onClose, onSubmit, initialData }: DoctorModalProps) {
    const [currentStep, setCurrentStep] = useState<Step>("search");
    const [cedula, setCedula] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [personData, setPersonData] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const { addNotification } = useNotificationStore();
    const [error, setError] = useState<string | null>(null);

    // Fresh fetch for persona data when editing to ensure all fields are present
    const { data: fetchedPersona, isLoading: isFetchingPersona } = useQuery({
        queryKey: ["persona", initialData?.cedula || initialData?.persona?.cedula, initialData?.tipo_cedula || initialData?.persona?.tipo_cedula],
        queryFn: async () => {
            const targetCedula = initialData.cedula || initialData.persona.cedula;
            const targetTipo = initialData.tipo_cedula || initialData.persona.tipo_cedula;
            const { data } = await axiosClientInstance.get(`/personas/${targetTipo}/${targetCedula}`);
            return data;
        },
        enabled: !!(isOpen && initialData && (initialData.cedula || initialData?.persona?.cedula)),
    });

    // Initial Data Handler (For Editing)
    useEffect(() => {
        if (initialData && isOpen) {
            setCedula(initialData.cedula || initialData.persona?.cedula || "");
            setTipoCedula(initialData.tipo_cedula || initialData.persona?.tipo_cedula || "V");
            setSearchStatus("found");
            setCurrentStep("persona"); 

            // If we have freshly fetched data, use it; otherwise fallback to initialData
            const persona = fetchedPersona || initialData.persona || initialData;
            setPersonData({
                ...persona,
                fullname: persona.fullname || persona.Fullname || persona.fullName || persona.FullName || "",
                telefono: persona.telefono || persona.Telefono || persona.phone || persona.Phone || "",
                direccion: persona.direccion || persona.Direccion || persona.address || persona.Address || "",
                sexo: persona.sexo || persona.Sexo || persona.gender || persona.Gender || "",
                nacimiento: persona.nacimiento || persona.Nacimiento || null,
                email: persona.email || persona.Email || ""
            });
        } else if (!isOpen) {
            resetModal();
        }
    }, [initialData, isOpen, fetchedPersona]);

    const resetModal = () => {
        setSearchStatus("idle");
        setPersonData(null);
        setCedula("");
        setTipoCedula("V");
        setCurrentStep("search");
        setError(null);
        setIsSearching(false);
    };

    const handleSearch = async () => {
        if (!cedula || !tipoCedula) return;
        setIsSearching(true);
        setError(null);
        setSearchStatus("searching");

        try {
            const { data } = await axiosClientInstance.get(`/personas/${tipoCedula}/${cedula}`);
            if (data) {
                setPersonData(data);
                setSearchStatus("found");
                setCurrentStep("persona"); 
            } else {
                setSearchStatus("not-found");
                setCurrentStep("persona"); 
            }
        } catch (err: any) {
            const status = err.response?.status;
            if (status === 400 || status === 404) {
                setSearchStatus("not-found");
                setPersonData(null);
                setCurrentStep("persona");
            } else {
                const errorMessage = handleAxiosError(err);
                setError(errorMessage);
                addNotification("error", errorMessage);
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleBack = () => {
        if (currentStep === "persona") {
            if (initialData) {
                onClose(); // Can't go back to search in edit mode
            } else {
                setCurrentStep("search");
                setSearchStatus("idle");
            }
        } else if (currentStep === "specialist") {
            setCurrentStep("persona");
        }
    };

    const handlePersonSubmit = (data: any) => {
        setPersonData(data);
        setSearchStatus("found");
        setCurrentStep("specialist");
    };

    const handleSubmitDoctor = (doctorSpecificData: CreateDoctorInterface) => {
        onSubmit(doctorSpecificData);
        onClose();
    };

    const currentStepIndex = DOCTOR_STEPS.findIndex(s => s.id === currentStep);

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
                            <div className="flex items-center gap-3">
                                {currentStep !== "search" && (
                                    <button
                                        onClick={handleBack}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Volver"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {initialData ? "Editar Doctor" : "Registrar Doctor"}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {currentStep === "search" && "Busque una persona por cédula."}
                                        {currentStep === "persona" && (searchStatus === "found" ? "Confirme los datos de la persona." : "Registre los datos de la persona.")}
                                        {currentStep === "specialist" && "Agregue especialidades y datos del doctor."}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Stepper */}
                        <div className="px-6 py-2 border-b border-gray-50">
                            <FormStepper steps={DOCTOR_STEPS} currentStepIndex={currentStepIndex} />
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Search */}
                                {currentStep === "search" && (
                                    <motion.div
                                        key="search"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6 py-4"
                                    >
                                        <div className="max-w-md mx-auto space-y-4">
                                            <label className="text-sm font-semibold text-gray-700 block">
                                                Cédula de Identidad
                                            </label>
                                            <div className="flex gap-2">
                                                <select
                                                    value={tipoCedula}
                                                    onChange={(e) => setTipoCedula(e.target.value)}
                                                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-gray-50/50"
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
                                                        className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
                                                        autoFocus
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        {isSearching && <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleSearch}
                                                    disabled={!cedula || isSearching}
                                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors shadow-lg shadow-gray-200"
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Persona Form */}
                                {currentStep === "persona" && (
                                    <motion.div
                                        key="persona"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        {isFetchingPersona ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                                                <p className="text-gray-500 animate-pulse">Cargando datos detallados...</p>
                                            </div>
                                        ) : (
                                            <PersonForm
                                                initialData={personData ? { ...personData, tipoCedula: personData.tipo_cedula || tipoCedula } : { cedula, tipoCedula }}
                                                onSubmit={handlePersonSubmit}
                                                onCancel={onClose}
                                            />
                                        )}
                                    </motion.div>
                                )}

                                {/* Step 3: Doctor Form */}
                                {currentStep === "specialist" && (
                                    <motion.div
                                        key="specialist"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <DoctorForm
                                            onSubmit={handleSubmitDoctor}
                                            onCancel={onClose}
                                            initialData={personData}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
