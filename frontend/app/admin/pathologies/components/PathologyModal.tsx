"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, AlertCircle } from "lucide-react";
import { useNotification } from "@/app/context/NotificationContext";
import axiosClientInstance from "@/lib/AxiosClientInstance";

interface Pathology {
    name: string;
    descripcion: string;
    riesgo: string;
}

interface PathologyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Pathology) => void;
    initialData?: Pathology | null;
    existingNames: string[];
}

export default function PathologyModal({ isOpen, onClose, onSubmit, initialData, existingNames }: PathologyModalProps) {
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState<Pathology>({
        name: "",
        descripcion: "",
        riesgo: "Bajo"
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
                setIsEditing(true);
            } else {
                setFormData({
                    name: "",
                    descripcion: "",
                    riesgo: "Bajo"
                });
            }
            setError(null);
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            addNotification("error", "El nombre es obligatorio.");
            setError("El nombre es obligatorio.");
            return;
        }

        // Duplicate Name Check
        const nameExists = existingNames.some(name =>
            name.toLowerCase() === formData.name.trim().toLowerCase() &&
            name.toLowerCase() !== initialData?.name.toLowerCase() // Exclude current name if editing
        );

        if (nameExists) {
            addNotification("error", `La patología "${formData.name}" ya existe.`);
            setError(`La patología "${formData.name}" ya existe.`);
            return;
        }
        if (isEditing ) {
                // Update existing pathology
                const response = await axiosClientInstance.patch(`/patologia/${formData.name}`, formData);
                addNotification("success", "Patología actualizada con éxito");
            } else {
                // Create new pathology
                const response = await axiosClientInstance.post("/patologia", formData);
                addNotification("success", "Patología creada con éxito");
            }
        onSubmit(formData);
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
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {initialData ? "Editar Patología" : "Nueva Patología"}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        maxLength={100}
                                        placeholder="Ej: Hipertensión Arterial"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        rows={3}
                                        maxLength={1000}
                                        placeholder="Breve descripción de la condición..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Nivel de Riesgo</label>
                                    <select
                                        name="riesgo"
                                        value={formData.riesgo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white transition-all"
                                    >
                                        <option value="Bajo">Bajo</option>
                                        <option value="Medio">Medio</option>
                                        <option value="Alto">Alto</option>
                                    </select>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg animate-fadeIn">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div className="pt-2 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all font-medium flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {initialData ? "Actualizar" : "Guardar"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
