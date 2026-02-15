"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle, AlertCircle, Loader2, Save } from "lucide-react";
import PersonForm from "./PersonForm";
import PatientForm from "./PatientForm";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

interface CreatePatientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type SearchStatus = "idle" | "searching" | "found" | "not-found";

export default function CreatePatientModal({ isOpen, onClose }: CreatePatientModalProps) {
    const [cedula, setCedula] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [personData, setPersonData] = useState<CreatePersonaInterface>({} as CreatePersonaInterface);
    const [error, setError] = useState<string | null>(null);

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
            setError(handleAxiosError(error));
            setPersonData({} as CreatePersonaInterface);
            setSearchStatus("not-found");
        }

    };

    const handlePersonSubmit = (data: CreatePersonaInterface) => {
        if (!data) {
            setSearchStatus("not-found");
            return;
        };

        setPersonData(data);
        setSearchStatus("found");
    };

    const handleReset = () => {
        setSearchStatus("idle");
        setPersonData({} as CreatePersonaInterface);
        setCedula("");
        setError(null);
    };

    const handleSubmitPatient = (data: any) => {
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Registrar Paciente</h2>
                                    <p className="text-sm text-gray-500">Busque una persona existente o regístrela.</p>
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
                                        Buscar por Cédula
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={tipoCedula}
                                            onChange={(e) => setTipoCedula(e.target.value)}
                                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-gray-50/50"
                                            disabled={searchStatus === "found"}
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
                                                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                disabled={searchStatus === "found"} // Disable if found to lock logic, can add clear button later
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
                                            disabled={!cedula || searchStatus === "searching" || searchStatus === "found"}
                                            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors flex items-center gap-2"
                                        >
                                            <Search className="w-4 h-4" />
                                            Buscar
                                        </button>

                                        {(searchStatus !== "idle" || cedula) && (
                                            <button
                                                onClick={handleReset}
                                                className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium transition-colors flex items-center gap-2"
                                                title="Limpiar búsqueda"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Status Feedback */}
                                    <div className="mt-2 text-sm min-h-[20px]">
                                        {searchStatus === "not-found" && (
                                            <span className="text-orange-600 flex items-center gap-1 animate-fadeIn">
                                                Persona no encontrada. Por favor complete el registro abajo.
                                            </span>
                                        )}
                                        {searchStatus === "found" && (
                                            <span className="text-green-600 flex items-center gap-1 animate-fadeIn">
                                                Persona encontrada: <strong>{personData?.fullname}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Content Area */}
                                <div className="space-y-6">
                                    {/* Case 1: Person NOT Found -> Show Registration Form */}
                                    {searchStatus === "not-found" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="overflow-hidden"
                                        >
                                            <PersonForm
                                                initialData={{ cedula, tipoCedula }}
                                                onSubmit={handlePersonSubmit}
                                                onCancel={handleReset}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Case 2: Person Found (or just registered) -> Show Patient Fields */}
                                    {searchStatus === "found" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <PatientForm
                                                initialData={personData}
                                                onSubmit={handleSubmitPatient}
                                                onCancel={handleReset}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
