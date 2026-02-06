"use client";

import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Activity,
    Users,
    TrendingUp,
    MoreVertical,
    Edit,
    Trash2,
    AlertCircle
} from "lucide-react";

export default function PathologiesPage() {
    // Mock Data
    const stats = [
        { title: "Hipertensión", count: 45, trend: "+12%", color: "bg-red-500" },
        { title: "Diabetes T2", count: 38, trend: "+5%", color: "bg-orange-500" },
        { title: "Asma", count: 22, trend: "-2%", color: "bg-blue-500" },
    ];

    const pathologies = [
        {
            id: 1,
            name: "Hipertensión Arterial",
            description: "Presión arterial alta crónica que requiere monitoreo constante.",
            category: "Cardiovascular",
            patientsCount: 45,
            riskLevel: "Alto"
        },
        {
            id: 2,
            name: "Diabetes Tipo 2",
            description: "Afección crónica que afecta la forma en que el cuerpo procesa el azúcar.",
            category: "Endocrinología",
            patientsCount: 38,
            riskLevel: "Medio"
        },
        {
            id: 3,
            name: "Asma Bronquial",
            description: "Afección en la que las vías respiratorias se estrechan y producen más mucosidad.",
            category: "Respiratoria",
            patientsCount: 22,
            riskLevel: "Bajo"
        },
        {
            id: 4,
            name: "Artritis Reumatoide",
            description: "Trastorno inflamatorio crónico que afecta las articulaciones.",
            category: "Reumatología",
            patientsCount: 15,
            riskLevel: "Medio"
        },
        {
            id: 5,
            name: "Gastritis Crónica",
            description: "Inflamación del revestimiento del estómago durante un largo periodo.",
            category: "Gastroenterología",
            patientsCount: 12,
            riskLevel: "Bajo"
        }
    ];

    const getRiskColor = (level: string) => {
        switch (level) {
            case "Alto": return "text-red-600 bg-red-50 border-red-100";
            case "Medio": return "text-orange-600 bg-orange-50 border-orange-100";
            case "Bajo": return "text-green-600 bg-green-50 border-green-100";
            default: return "text-gray-600 bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patologías</h1>
                    <p className="text-gray-500 mt-1">Administración de condiciones médicas y estadísticas.</p>
                </div>

                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Nueva Patología</span>
                </button>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-gray-500 mb-1">Más Común #{i + 1}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="font-semibold text-gray-700">{stat.count} pacientes</span>
                                <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold">{stat.trend}</span>
                            </div>
                        </div>
                        <div className={`absolute right-0 top-0 w-24 h-full ${stat.color} opacity-10 transform skew-x-12 translate-x-4`} />
                        <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                            <Activity className="w-6 h-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content: Search + List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-purple-600" /> Listado General
                    </h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar patología..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Pacientes</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Nivel de Riesgo</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {pathologies.map((pathology) => (
                                <motion.tr
                                    key={pathology.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                    className="group"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{pathology.name}</p>
                                            <p className="text-sm text-gray-500 line-clamp-1">{pathology.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                            {pathology.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                                            <Users className="w-3.5 h-3.5" />
                                            {pathology.patientsCount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(pathology.riskLevel)}`}>
                                            {pathology.riskLevel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Info */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 text-center">
                    <span className="text-xs text-gray-400">Mostrando 5 de 42 patologías registradas</span>
                </div>
            </div>
        </div>
    );
}
