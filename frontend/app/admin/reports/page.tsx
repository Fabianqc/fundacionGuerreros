"use client";

import { motion } from "framer-motion";
import {
    BarChart2,
    PieChart,
    Download,
    Calendar,
    FileText,
    TrendingUp,
    Users,
    ArrowUpRight
} from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("Últimos 30 días");

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reportes Detallados</h1>
                    <p className="text-gray-500 mt-1">Análisis de datos y métricas de la fundación.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm font-medium text-gray-700 cursor-pointer appearance-none"
                        >
                            <option>Hoy</option>
                            <option>Última semana</option>
                            <option>Últimos 30 días</option>
                            <option>Este año</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Exportar</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Chart 1: Patient Growth (Bar/Comb) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                            Crecimiento de Pacientes
                        </h2>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +12% vs mes anterior
                        </span>
                    </div>

                    {/* CSS Bar Chart Mockup */}
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-purple-100 rounded-t-lg relative overflow-hidden group-hover:bg-purple-200 transition-colors"
                                    style={{ height: `${h}%` }}
                                >
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "100%" }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="w-full bg-purple-500 absolute bottom-0 rounded-t-lg opacity-80"
                                    />
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">
                                    {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Chart 2: Pathology Distribution (Donut style) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                        <PieChart className="w-5 h-5 text-blue-600" />
                        Distribución
                    </h2>

                    <div className="relative w-48 h-48 mx-auto mb-6">
                        {/* Simple CSS Donut representation */}
                        <div className="absolute inset-0 rounded-full border-[16px] border-blue-100"></div>
                        <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-t-transparent border-l-transparent -rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-[16px] border-purple-500 border-b-transparent border-r-transparent rotate-12"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">450</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Total Casos</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600">
                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                Hipertensión
                            </span>
                            <span className="font-bold text-gray-900">45%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                Diabetes
                            </span>
                            <span className="font-bold text-gray-900">35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600">
                                <span className="w-3 h-3 rounded-full bg-blue-100"></span>
                                Otros
                            </span>
                            <span className="font-bold text-gray-900">20%</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Activity / Logs */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Reportes Generados Recientemente
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Resumen Mensual - Enero 2026</p>
                                        <p className="text-xs text-gray-500">Generado por Admin • Hace 2 días</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 group-hover:text-purple-600 transition-colors bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Consultas Totales", val: "1,240", icon: FileText, color: "text-blue-600 bg-blue-50" },
                        { label: "Nuevos Pacientes", val: "85", icon: Users, color: "text-green-600 bg-green-50" },
                        { label: "Satisfacción", val: "98%", icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
                        { label: "Eficiencia", val: "92%", icon: BarChart2, color: "text-orange-600 bg-orange-50" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className={`p-3 rounded-full mb-3 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.val}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
