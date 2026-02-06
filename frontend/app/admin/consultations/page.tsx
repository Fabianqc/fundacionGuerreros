"use client";

import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    Calendar,
    Clock,
    FileText,
    User,
    Stethoscope,
    MoreHorizontal,
    Eye,
    CalendarClock
} from "lucide-react";

export default function ConsultationsPage() {
    // Mock Data
    const consultations = [
        {
            id: 101,
            patient: "María González",
            doctor: "Dr. Roberto Díaz",
            specialty: "Cardiología",
            date: "06 Feb 2026",
            time: "09:00 AM",
            status: "Agendada",
            reason: "Chequeo Mensual",
            image: null
        },
        {
            id: 102,
            patient: "Juan Pérez",
            doctor: "Dra. Elena Silva",
            specialty: "Pediatría",
            date: "06 Feb 2026",
            time: "10:30 AM",
            status: "En Progreso",
            reason: "Fiebre persistente",
            image: null
        },
        {
            id: 103,
            patient: "Carlos Ruiz",
            doctor: "Dr. Roberto Díaz",
            specialty: "Cardiología",
            date: "05 Feb 2026",
            time: "02:00 PM",
            status: "Completada",
            reason: "Evaluación post-op",
            image: null
        },
        {
            id: 104,
            patient: "Luisa Martínez",
            doctor: "Dr. Mario Gomez",
            specialty: "Traumatología",
            date: "07 Feb 2026",
            time: "11:00 AM",
            status: "Agendada",
            reason: "Dolor en rodilla",
            image: null
        },
        {
            id: 105,
            patient: "Ana Rodríguez",
            doctor: "Dra. Elena Silva",
            specialty: "Pediatría",
            date: "04 Feb 2026",
            time: "04:00 PM",
            status: "Cancelada",
            reason: "Control anual",
            image: null
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Agendada": return "bg-blue-100 text-blue-700";
            case "En Progreso": return "bg-purple-100 text-purple-700 animate-pulse";
            case "Completada": return "bg-green-100 text-green-700";
            case "Cancelada": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Consultas Médicas</h1>
                    <p className="text-gray-500 mt-1">Programación y control de citas médicas.</p>
                </div>

                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Nueva Consulta</span>
                </button>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    {/* Search */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Buscar</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Paciente, doctor o ID..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Specialist Filter */}
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Especialidad</label>
                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-gray-50/50 focus:bg-white cursor-pointer hover:border-purple-200 transition-colors appearance-none">
                            <option>Todas</option>
                            <option>Cardiología</option>
                            <option>Pediatría</option>
                            <option>Traumatología</option>
                            <option>Medicina General</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Estado</label>
                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-gray-50/50 focus:bg-white cursor-pointer hover:border-purple-200 transition-colors appearance-none">
                            <option>Todos</option>
                            <option>Agendada</option>
                            <option>Completada</option>
                            <option>Cancelada</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Consultations Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100 opacity-70">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Detalles Médicos</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {consultations.map((consultation) => (
                                <motion.tr
                                    key={consultation.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                    className="group transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                {consultation.patient.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-700">{consultation.patient}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{consultation.reason}</span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                <Stethoscope className="w-3 h-3" /> {consultation.specialty}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {consultation.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock className="w-3.5 h-3.5" />
                                                {consultation.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-lg inline-block">
                                            {consultation.doctor}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border border-transparent ${getStatusColor(consultation.status)}`}>
                                            {consultation.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                                <Eye className="w-3.5 h-3.5" /> Ver
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Reprogramar">
                                                <CalendarClock className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center md:justify-end gap-4 bg-gray-50/30">
                    <span className="text-xs text-gray-400">Página 1 de 5</span>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-white hover:text-gray-600 disabled:opacity-50" disabled>&lt;</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
