"use client";

import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    History,
    FileText,
    User,
    Phone,
    Mail
} from "lucide-react";

export default function PatientsPage() {
    // Mock Data
    const patients = [
        {
            id: 1,
            name: "María González",
            cedula: "V-12.345.678",
            email: "maria.gonzalez@email.com",
            phone: "0414-1234567",
            lastVisit: "05 Feb 2026",
            status: "Activo",
            image: null
        },
        {
            id: 2,
            name: "Juan Pérez",
            cedula: "V-8.999.111",
            email: "juan.perez@email.com",
            phone: "0412-9876543",
            lastVisit: "01 Feb 2026",
            status: "Inactivo",
            image: null
        },
        {
            id: 3,
            name: "Ana Rodríguez",
            cedula: "V-20.111.222",
            email: "ana.rod@email.com",
            phone: "0424-5556677",
            lastVisit: "28 Ene 2026",
            status: "Activo",
            image: null
        },
        {
            id: 4,
            name: "Carlos Ruiz",
            cedula: "V-15.444.333",
            email: "carlos.ruiz@email.com",
            phone: "0416-2223344",
            lastVisit: "15 Ene 2026",
            status: "Pendiente",
            image: null
        },
        {
            id: 5,
            name: "Luisa Martínez",
            cedula: "V-25.666.777",
            email: "luisa.m@email.com",
            phone: "0414-8889900",
            lastVisit: "10 Dic 2025",
            status: "Activo",
            image: null
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Activo": return "bg-green-100 text-green-700";
            case "Inactivo": return "bg-red-100 text-red-700";
            case "Pendiente": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
                    <p className="text-gray-500 mt-1">Gestiona el registro clínico de la fundación.</p>
                </div>

                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Nuevo Paciente</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, cédula..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Identificación</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Última Visita</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {patients.map((patient) => (
                                <motion.tr
                                    key={patient.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                    className="group transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                                                {userInitial(patient.name)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{patient.name}</p>
                                                <p className="text-xs text-gray-400">ID: #{patient.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                            {patient.cedula}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3" /> {patient.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {patient.lastVisit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Ver Historial">
                                                <History className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Mockup */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <span className="text-sm text-gray-500">Mostrando 1-5 de 24 pacientes</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg bg-white disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function userInitial(name: string) {
    return name.charAt(0).toUpperCase();
}
