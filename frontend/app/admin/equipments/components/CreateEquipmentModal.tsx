"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Package, Tag, AlertCircle } from "lucide-react";

interface Equipment {
    id: string;
    name: string;
    category: string;
    totalStock: number;
    available: number;
    loaned: number;
    status: 'Disponible' | 'Bajo Stock' | 'Crítico' | 'Agotado';
    lastMaintenance: string;
}

interface CreateEquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Equipment, "id" | "available" | "loaned" | "lastMaintenance">) => void;
    initialData?: Equipment | null;
}

export default function CreateEquipmentModal({ isOpen, onClose, onSubmit, initialData }: CreateEquipmentModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        totalStock: 0,
        status: "Disponible" as Equipment['status']
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                totalStock: initialData.totalStock,
                status: initialData.status
            });
        } else {
            setFormData({
                name: "",
                category: "",
                totalStock: 0,
                status: "Disponible"
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "totalStock" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {initialData ? "Editar Equipo" : "Registrar Nuevo Equipo"}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {initialData ? "Modifique los datos del inventario." : "Ingrese los datos del nuevo equipo."}
                                    </p>
                                </div>
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
                                    <label className="text-xs font-medium text-gray-700">Nombre del Equipo</label>
                                    <div className="relative">
                                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Ej: Silla de Ruedas"
                                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-700">Categoría</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                                            required
                                        >
                                            <option value="">Seleccionar Categoría</option>
                                            <option value="Movilidad">Movilidad</option>
                                            <option value="Mobiliario">Mobiliario</option>
                                            <option value="Accesorios">Accesorios</option>
                                            <option value="Ortopedia">Ortopedia</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Stock Total</label>
                                        <input
                                            type="number"
                                            name="totalStock"
                                            value={formData.totalStock}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Estado Inicial</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                                        >
                                            <option value="Disponible">Disponible</option>
                                            <option value="Bajo Stock">Bajo Stock</option>
                                            <option value="Crítico">Crítico</option>
                                            <option value="Agotado">Agotado</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {initialData ? "Guardar Cambios" : "Registrar Equipo"}
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
