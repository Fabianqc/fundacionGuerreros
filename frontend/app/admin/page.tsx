"use client";

import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    Activity,
    Calendar,
    Plus,
    Stethoscope,
    ShieldPlus,
    UserPlus,
    Accessibility,
    FileText,
    Settings
} from "lucide-react";

export default function AdminDashboard() {
    // Mock Data for Charts/Stats
    const dailyAdmissions = { count: 24, trend: "+12%" };

    // Quick Actions Configuration
    const actions = [
        { title: "Nueva Consulta", icon: Stethoscope, color: "bg-blue-500", href: "/admin/consultations/new" },
        { title: "Administrar Patologías", icon: Activity, color: "bg-purple-500", href: "/admin/pathologies" },
        { title: "Añadir Ayudas Técnicas", icon: Accessibility, color: "bg-teal-500", href: "/admin/equipments/new" },
        { title: "Añadir Doctor", icon: ShieldPlus, color: "bg-indigo-500", href: "/admin/doctors/new" },
        { title: "Añadir Usuarios", icon: UserPlus, color: "bg-pink-500", href: "/admin/users/new" },
        { title: "Reportes Detallados", icon: FileText, color: "bg-orange-500", href: "/admin/reports" },
    ];

    const categories = [
        { name: "Cardiología", value: 35, color: "bg-red-400" },
        { name: "Pediatría", value: 25, color: "bg-blue-400" },
        { name: "General", value: 20, color: "bg-green-400" },
        { name: "Otros", value: 20, color: "bg-gray-300" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Greeting */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hola, Admin 👋</h1>
                <p className="text-gray-500 mt-1">Aquí tienes el resumen de hoy en la fundación.</p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Stat Card 1: Daily Admissions */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Ingresos de Hoy</p>
                            <h3 className="text-4xl font-extrabold text-gray-900">{dailyAdmissions.count}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full mr-2">{dailyAdmissions.trend}</span>
                        <span className="text-gray-400">vs ayer</span>
                    </div>
                </motion.div>

                {/* Stat Card 2: Pathology Breakdown (Visual Bar) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1 md:col-span-2"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800">Patologías Frecuentes</h3>
                        <button className="text-sm text-purple-600 font-medium hover:underline">Ver todo</button>
                    </div>

                    {/* Visual Bar Chart Mockup */}
                    <div className="space-y-4">
                        <div className="flex h-4 rounded-full overflow-hidden w-full bg-gray-100">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={cat.name}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${cat.value}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`${cat.color}`}
                                    title={`${cat.name}: ${cat.value}%`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {categories.map((cat) => (
                                <div key={cat.name} className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                                    <span>{cat.name} ({cat.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Control Panel - Left Side */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-purple-600" /> Panel de Control
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {actions.map((action, index) => (
                            <motion.a
                                key={action.title}
                                href={action.href}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
                            >
                                <div className={`${action.color} p-4 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                                    <action.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors">{action.title}</h3>
                                    <p className="text-xs text-gray-400">Acceso rápido</p>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                    <Plus className="w-5 h-5 text-gray-300" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Right Side - Additional Stats / Info */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Ingresos por Edades</h3>
                            <p className="text-purple-200 text-sm mb-6">Tendencia de esta semana</p>

                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-sm">
                                    <span>0 - 12 años</span>
                                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">15%</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span>13 - 18 años</span>
                                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">10%</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span>19 - 60 años</span>
                                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">45%</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span>+60 años</span>
                                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">30%</span>
                                </li>
                            </ul>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/20 rounded-full blur-xl" />
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" /> Actividad Reciente
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Nueva consulta registrada</p>
                                        <p className="text-xs text-gray-400">Hace {10 + i * 5} minutos • Dr. Pérez</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
