"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Stethoscope, Phone, Mail, Award, CreditCard } from "lucide-react";

interface Doctor {
    id: string;
    fullName: string;
    cedula: string;
    phone: string;
    email: string;
    speciality: string;
    licenseNumber: string; // Numero de Colegio de Medicos
    status: 'Activo' | 'Inactivo';
}

interface DoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Doctor, "id">) => void;
    initialData?: Doctor | null;
}

export default function DoctorModal({ isOpen, onClose, onSubmit, initialData }: DoctorModalProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        cedula: "",
        phone: "",
        email: "",
        speciality: "",
        licenseNumber: "",
        status: "Activo" as const
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName,
                cedula: initialData.cedula,
                phone: initialData.phone,
                email: initialData.email,
                speciality: initialData.speciality,
                licenseNumber: initialData.licenseNumber,
                status: initialData.status
            });
        } else {
            setFormData({
                fullName: "",
                cedula: "",
                phone: "",
                email: "",
                speciality: "",
                licenseNumber: "",
                status: "Activo"
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
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
                        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {initialData ? "Editar Doctor" : "Registrar Nuevo Doctor"}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {initialData ? "Actualice la información profesional." : "Ingrese los datos del profesional de la salud."}
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
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            {/* Personal Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <User className="w-4 h-4 text-purple-600" /> Información Personal
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Dr. Juan Pérez"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Cédula de Identidad</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="cedula"
                                                value={formData.cedula}
                                                onChange={handleChange}
                                                placeholder="V-12345678"
                                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Teléfono</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="0414-1234567"
                                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Correo Electrónico</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="doctor@ejemplo.com"
                                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <Stethoscope className="w-4 h-4 text-purple-600" /> Información Profesional
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">Especialidad</label>
                                        <select
                                            name="speciality"
                                            value={formData.speciality}
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
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-700">N° Colegio de Médicos</label>
                                        <div className="relative">
                                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
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
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                                        >
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
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
                                    {initialData ? "Guardar Cambios" : "Completar Registro"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
