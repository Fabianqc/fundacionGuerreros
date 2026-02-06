"use client";

import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Accessibility,
    Package,
    RefreshCcw,
    AlertTriangle,
    MoreVertical,
    Edit,
    Archive
} from "lucide-react";

export default function EquipmentsPage() {
    // Mock Stats
    const stats = [
        { title: "Total Activos", value: 124, icon: Package, color: "bg-blue-500" },
        { title: "En Préstamo", value: 45, icon: Accessibility, color: "bg-purple-500" },
        { title: "Disponibles", value: 79, icon: RefreshCcw, color: "bg-green-500" },
        { title: "Mantenimiento", value: 3, icon: AlertTriangle, color: "bg-orange-500" },
    ];

    // Mock Data
    const equipment = [
        {
            id: "EQ-2024-001",
            name: "Silla de Ruedas Estándar",
            category: "Movilidad",
            totalStock: 15,
            available: 5,
            loaned: 10,
            status: "Bajo Stock",
            lastMaintenance: "15 Ene 2026"
        },
        {
            id: "EQ-2024-002",
            name: "Muletas de Aluminio (Par)",
            category: "Movilidad",
            totalStock: 30,
            available: 28,
            loaned: 2,
            status: "Disponible",
            lastMaintenance: "01 Feb 2026"
        },
        {
            id: "EQ-2024-003",
            name: "Cama Clínica Eléctrica",
            category: "Mobiliario",
            totalStock: 5,
            available: 1,
            loaned: 4,
            status: "Crítico",
            lastMaintenance: "20 Ene 2026"
        },
        {
            id: "EQ-2024-004",
            name: "Andadera Plegable",
            category: "Movilidad",
            totalStock: 20,
            available: 15,
            loaned: 5,
            status: "Disponible",
            lastMaintenance: "10 Dic 2025"
        },
        {
            id: "EQ-2024-005",
            name: "Colchón Antiescaras",
            category: "Accesorios",
            totalStock: 12,
            available: 0,
            loaned: 12,
            status: "Agotado",
            lastMaintenance: "N/A"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Disponible": return "text-green-700 bg-green-100";
            case "Bajo Stock": return "text-orange-700 bg-orange-100";
            case "Crítico": return "text-red-700 bg-red-100";
            case "Agotado": return "text-gray-700 bg-gray-200";
            default: return "text-gray-700 bg-gray-100";
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Ayudas Técnicas</h1>
                    <p className="text-gray-500 mt-1">Gestión de inventario y préstamos de equipos.</p>
                </div>

                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Registrar Equipo</span>
                </button>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl text-white shadow-lg ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Inventory List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Inventario General</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar equipo por nombre o código..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipo</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Total</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Disponibles</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {equipment.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                    className="group"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-400 font-mono">{item.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                        {item.totalStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-sm">
                                            {item.available}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                                                <Accessibility className="w-3.5 h-3.5" /> Prestar
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
