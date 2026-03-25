"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2, ArrowLeft } from "lucide-react";
import PersonForm from "./PersonForm";
import FormStepper from "@/app/components/ui/FormStepper";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useNotificationStore } from "@/app/store/useNotificationStore";

interface AddFamilyMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (member: { persona: any, parentesco: string }) => void;
}

type Step = "search" | "persona";
type SearchStatus = "idle" | "searching" | "found" | "not-found";

const FAMILY_STEPS = [
    { id: "search", label: "Buscar" },
    { id: "persona", label: "Persona & Parentesco" }
];

const PARENTESCO_OPTIONS = [
    "PADRE", "MADRE", "HIJO", "HIJA", "ESPOSO", "ESPOSA",
    "CONCUBINO", "CONCUBINA", "HERMANO", "HERMANA", "ABUELO", "ABUELA",
    "NIETO", "NIETA", "TIO", "TIA", "SOBRINO", "SOBRINA", "PRIMO", "PRIMA",
    "SUEGRO", "SUEGRA", "YERNO", "NUERA", "CUÑADO", "CUÑADA", "TUTOR_LEGAL", "OTRO"
];

export default function AddFamilyMemberModal({ isOpen, onClose, onSuccess }: AddFamilyMemberModalProps) {
    const [currentStep, setCurrentStep] = useState<Step>("search");
    const [cedula, setCedula] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [personData, setPersonData] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parentesco, setParentesco] = useState<string>("");

    const { addNotification } = useNotificationStore();

    useEffect(() => {
        if (!isOpen) {
            setSearchStatus("idle");
            setPersonData(null);
            setCedula("");
            setTipoCedula("V");
            setCurrentStep("search");
            setError(null);
            setIsSearching(false);
            setParentesco("");
        }
    }, [isOpen]);

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
            setCurrentStep("search");
            setSearchStatus("idle");
        }
    };

    const handlePersonSubmit = (data: any) => {
        if (!parentesco) {
            addNotification("error", "Debe seleccionar un parentesco");
            return;
        }

        // Si ya existía y solo estamos relacionando, data puede ser el fromData inicial.
        // Si no, la mutation de PersonForm devuelve los datos guardados de la BD
        const personToSave = data.id || data.UUID ? data : personData || data;
        
        onSuccess({ persona: personToSave, parentesco });
        onClose();
    };

    const currentStepIndex = FAMILY_STEPS.findIndex(s => s.id === currentStep);

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
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Agregar Familiar
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {currentStep === "search" && "Busque el familiar por cédula."}
                                        {currentStep === "persona" && "Indique parentesco y confirme datos."}
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
                            <FormStepper steps={FAMILY_STEPS} currentStepIndex={currentStepIndex} />
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
                                                    <option value="G">G</option>
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
                                                    type="button"
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

                                {/* Step 2: Persona Form + Parentesco Dropdown */}
                                {currentStep === "persona" && (
                                    <motion.div
                                        key="persona"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                            <label className="text-sm font-semibold text-indigo-900 block mb-2">
                                                ¿Qué parentesco tiene esta persona con el paciente?
                                            </label>
                                            <select
                                                value={parentesco}
                                                onChange={(e) => setParentesco(e.target.value)}
                                                className="w-full px-4 py-2 border border-indigo-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                            >
                                                <option value="">Seleccione un parentesco</option>
                                                {PARENTESCO_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <PersonForm
                                            initialData={personData ? { ...personData, tipoCedula: personData.tipo_cedula || tipoCedula } : { cedula, tipoCedula: tipoCedula }}
                                            onSubmit={handlePersonSubmit}
                                            onCancel={onClose}
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
