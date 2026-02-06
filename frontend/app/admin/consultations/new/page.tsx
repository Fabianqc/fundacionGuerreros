"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Search,
    Calendar,
    Clock,
    Stethoscope,
    FileText,
    Save,
    X,
    ChevronRight,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function NewConsultationPage() {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Patients for search
    const patients = [
        { id: 1, name: "María González", cedula: "V-12.345.678" },
        { id: 2, name: "Juan Pérez", cedula: "V-8.999.111" },
        { id: 3, name: "Carlos Ruiz", cedula: "V-15.444.333" },
    ];

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cedula.includes(searchQuery)
    );

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nueva Consulta</h1>
                    <p className="text-gray-500 mt-1">Agendar una nueva cita médica.</p>
                </div>
                <Link
                    href="/admin/consultations"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span>Cancelar</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Form Steps */}
                <div className="md:col-span-2 space-y-8">

                    {/* Step 1: Patient Selection */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">1</span>
                            Seleccionar Paciente
                        </h2>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o cédula..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>

                        {searchQuery && (
                            <div className="space-y-2 mb-4">
                                {filteredPatients.map(patient => (
                                    <button
                                        key={patient.id}
                                        onClick={() => setSelectedPatient(patient.id)}
                                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${selectedPatient === patient.id
                                                ? "bg-purple-50 border border-purple-200 ring-1 ring-purple-500"
                                                : "hover:bg-gray-50 border border-transparent"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${selectedPatient === patient.id ? "bg-purple-200 text-purple-700" : "bg-gray-100 text-gray-500"
                                                }`}>
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{patient.name}</p>
                                                <p className="text-xs text-gray-500">{patient.cedula}</p>
                                            </div>
                                        </div>
                                        {selectedPatient === patient.id && <CheckCircle2 className="w-5 h-5 text-purple-600" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Step 2: Medical Details */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                            Detalles Médicos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                                <div className="relative">
                                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                        <option>Seleccionar...</option>
                                        <option>Cardiología</option>
                                        <option>Pediatría</option>
                                        <option>Medicina General</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Asignado</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                        <option>Seleccionar...</option>
                                        <option>Dr. Roberto Díaz</option>
                                        <option>Dra. Elena Silva</option>
                                    </select>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de Consulta</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describa brevemente el motivo de la visita..."
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Step 3: Schedule */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">3</span>
                            Fecha y Hora
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="time"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Summary & Action */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Paciente:</span>
                                <span className="font-medium text-gray-900 text-right">
                                    {selectedPatient ? patients.find(p => p.id === selectedPatient)?.name : "---"}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Doctor:</span>
                                <span className="font-medium text-gray-900 text-right">---</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Fecha:</span>
                                <span className="font-medium text-gray-900 text-right">---</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                                <Save className="w-5 h-5" />
                                Confirmar Cita
                            </button>
                            <Link href="/admin/consultations" className="block text-center">
                                <button className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm transition-colors">
                                    Cancelar operación
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
