"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle, AlertCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import PersonForm from "../../patients/components/PersonForm";
import PatientForm from "../../patients/components/PatientForm";
import ConsultationForm from "./ConsultationForm";

interface CreateConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = "search" | "person-form" | "patient-form" | "consultation-form";
type SearchStatus = "idle" | "searching" | "patient-found" | "person-found" | "not-found";

export default function CreateConsultationModal({ isOpen, onClose }: CreateConsultationModalProps) {
    const [cedula, setCedula] = useState("");
    const [currentStep, setCurrentStep] = useState<Step>("search");
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [searchMessage, setSearchMessage] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");

    // Data storage for the multi-step flow
    const [personData, setPersonData] = useState<any>(null);
    const [patientData, setPatientData] = useState<any>(null);

    const resetFlow = () => {
        setCedula("");
        setCurrentStep("search");
        setSearchStatus("idle");
        setPersonData(null);
        setPatientData(null);
        setSearchMessage("");
    };

    const handleClose = () => {
        resetFlow();
        onClose();
    };

    const handleSearch = async () => {
        if (!cedula) return;
        setSearchStatus("searching");
        setSearchMessage("");

        // MOCK API CALL LOGIC
        setTimeout(() => {
            if (cedula === "11111111") {
                // Case: Patient Exists
                setSearchStatus("patient-found");
                setPersonData({ fullName: "Carlos Ruiz", id: 101 });
                setPatientData({ id: 501 });
                setCurrentStep("consultation-form");
            } else if (cedula === "22222222") {
                // Case: Person Exists but NOT Patient
                setSearchStatus("person-found");
                setPersonData({ fullName: "Ana López", id: 102 });
                setSearchMessage("Persona encontrada, pero no es paciente. Complete los datos clínicos.");
                setTimeout(() => setCurrentStep("patient-form"), 1500);
            } else {
                // Case: Neither Exists
                setSearchStatus("not-found");
                setSearchMessage("No encontrado. Registre a la persona primero.");
                setTimeout(() => setCurrentStep("person-form"), 1500);
            }
        }, 800);
    };

    const handlePersonSubmit = (data: any) => {
        console.log("Person Created:", data);
        setPersonData({ ...data, id: 999 }); // Mock ID
        setCurrentStep("patient-form");
    };

    const handlePatientSubmit = (data: any) => {
        console.log("Patient Created:", data);
        setPatientData({ ...data, id: 888 }); // Mock ID
        setCurrentStep("consultation-form");
    };

    const handleConsultationSubmit = (data: any) => {
        console.log("Consultation Created:", {
            patientId: patientData.id,
            ...data
        });
        handleClose();
    };

    const handleBack = () => {
        if (currentStep === "person-form") {
            setCurrentStep("search");
        } else if (currentStep === "patient-form") {
            if (searchStatus === "person-found") {
                setCurrentStep("search");
            } else {
                setCurrentStep("person-form");
            }
        } else if (currentStep === "consultation-form") {
            if (searchStatus === "patient-found") {
                setCurrentStep("search");
            } else {
                setCurrentStep("patient-form");
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    {currentStep !== "search" && (
                                        <button
                                            onClick={handleBack}
                                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors"
                                            title="Volver"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Nueva Consulta</h2>
                                        <p className="text-sm text-gray-500">
                                            {currentStep === "search" && "Busque al paciente por cédula."}
                                            {currentStep === "person-form" && "Registro de Nueva Persona."}
                                            {currentStep === "patient-form" && "Registro de Datos Clínicos."}
                                            {currentStep === "consultation-form" && "Detalles de la Consulta."}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Progress Indicator (Optional but helpful) */}
                            {currentStep !== "search" && (
                                <div className="px-6 pt-4 pb-0">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                        <span className={currentStep === "person-form" ? "text-purple-600" : "text-gray-600"}>Persona</span>
                                        <ArrowRight className="w-3 h-3" />
                                        <span className={currentStep === "patient-form" ? "text-purple-600" : ""}>Paciente</span>
                                        <ArrowRight className="w-3 h-3" />
                                        <span className={currentStep === "consultation-form" ? "text-purple-600" : ""}>Consulta</span>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">

                                {/* Step 1: Search */}
                                {currentStep === "search" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                            <div className="w-full max-w-md space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Cédula del Paciente</label>
                                                <div className="flex gap-2">
                                                    <select
                                                        value={tipoCedula}
                                                        onChange={(e) => setTipoCedula(e.target.value)}
                                                        className="px-3 py-3 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-gray-50/50"
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
                                                            placeholder="Ej: 12.345.678"
                                                            className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-sm"
                                                            autoFocus
                                                        />
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                            {searchStatus === "searching" && <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleSearch}
                                                        disabled={!cedula || searchStatus === "searching"}
                                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors shadow-lg shadow-gray-200"
                                                    >
                                                        Buscar
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <div className="h-6 text-sm text-center">
                                                {searchMessage && (
                                                    <span className={`inline-flex items-center gap-1 ${searchStatus.includes("found") ? "text-green-600" : "text-orange-600"}`}>
                                                        {searchStatus.includes("found") ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                                        {searchMessage}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-xs text-gray-400 text-center max-w-xs leading-relaxed">
                                                Tip: Use <strong>11111111</strong> para Paciente existente, <strong>22222222</strong> para Persona existente (no paciente), u otro para Nuevo.
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Person Form */}
                                {currentStep === "person-form" && (
                                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                        <PersonForm
                                            initialData={{ cedula, tipoCedula }}
                                            onSubmit={handlePersonSubmit}
                                            onCancel={handleClose}
                                        />
                                    </motion.div>
                                )}

                                {/* Step 3: Patient Form */}
                                {currentStep === "patient-form" && (
                                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {personData?.fullName?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-blue-900">Registrando Paciente: {personData?.fullName}</h4>
                                                <p className="text-xs text-blue-600">Complete los datos clínicos para continuar a la consulta.</p>
                                            </div>
                                        </div>
                                        <PatientForm
                                            onSubmit={handlePatientSubmit}
                                            onCancel={handleClose}
                                            submitLabel="Guardar y Continuar a Consulta"
                                        />
                                    </motion.div>
                                )}

                                {/* Step 4: Consultation Form */}
                                {currentStep === "consultation-form" && (
                                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                        <ConsultationForm
                                            patientName={`${personData?.fullName}`}
                                            onSubmit={handleConsultationSubmit}
                                            onCancel={handleClose}
                                        />
                                    </motion.div>
                                )}

                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
