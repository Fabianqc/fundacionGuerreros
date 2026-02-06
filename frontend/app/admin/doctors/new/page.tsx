"use client";

import { motion } from "framer-motion";
import {
    User,
    UserPlus,
    Stethoscope,
    Phone,
    Mail,
    CreditCard,
    FileText,
    Calendar,
    Save,
    X,
    Upload
} from "lucide-react";
import Link from "next/link";

export default function NewDoctorPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registrar Médico</h1>
                    <p className="text-gray-500 mt-1">Añadir nuevo especialista al equipo médico.</p>
                </div>
                <Link
                    href="/admin"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span>Cancelar</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Photo & Basic Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto bg-purple-50 rounded-full flex items-center justify-center border-2 border-dashed border-purple-200 mb-4 cursor-pointer hover:bg-purple-100 transition-colors group relative overflow-hidden">
                                <Upload className="w-8 h-8 text-purple-400 group-hover:text-purple-600 transition-colors" />
                                <span className="sr-only">Subir Foto</span>
                            </div>
                            <button className="text-sm text-purple-600 font-medium hover:underline">Subir Foto de Perfil</button>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG max 2MB</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-600" />
                                Datos Personales
                            </h3>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Cédula de Identidad</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Teléfono</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Professional Info */}
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
                                <Stethoscope className="w-4 h-4 text-purple-600" />
                                Información Profesional
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                        <option>Seleccionar...</option>
                                        <option>Cardiología</option>
                                        <option>Pediatría</option>
                                        <option>Traumatología</option>
                                        <option>Medicina General</option>
                                        <option>Ginecología</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Licencia (MPPS)</label>
                                    <input
                                        type="text"
                                        placeholder="Ej. L-12345"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografía Corta</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Breve descripción del perfil profesional..."
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white resize-none"
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                Disponibilidad Semanal
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                                    <label key={day} className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300" />
                                        <span className="text-sm font-medium text-gray-700">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    <Link href="/admin">
                        <button className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200/50 rounded-xl transition-colors">
                            Cancelar
                        </button>
                    </Link>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                        <UserPlus className="w-5 h-5" />
                        Registrar Médico
                    </button>
                </div>
            </div>
        </div>
    );
}
