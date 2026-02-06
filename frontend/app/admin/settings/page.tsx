"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Shield,
    Bell,
    Users,
    Save,
    Globe,
    Mail,
    Lock,
    Smartphone
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "security", label: "Seguridad", icon: Shield },
        { id: "notifications", label: "Notificaciones", icon: Bell },
        { id: "team", label: "Equipo Admin", icon: Users },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
                <p className="text-gray-500 mt-1">Administra las preferencias globales del sistema.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${isActive
                                            ? "border-purple-600 bg-purple-50 text-purple-700"
                                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <tab.icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                    >
                        {activeTab === "general" && <GeneralSettings />}
                        {activeTab === "security" && <SecuritySettings />}
                        {activeTab === "notifications" && <NotificationSettings />}
                        {activeTab === "team" && <TeamSettings />}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function GeneralSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Información General</h2>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Sitio</label>
                    <input
                        type="text"
                        defaultValue="Fundación Guerreros de Amor"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo de Contacto</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            defaultValue="contacto@guerrerosdeamor.org"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                        <h3 className="font-semibold text-gray-900">Modo Mantenimiento</h3>
                        <p className="text-sm text-gray-500">Desactiva el acceso público al sitio temporalmente.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    <Save className="w-4 h-4" /> Guardar Cambios
                </button>
            </div>
        </div>
    );
}

function SecuritySettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Seguridad del Sistema</h2>

            <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Política de Contraseñas</h3>
                        <p className="text-sm text-gray-500 mb-3">Requerir cambio de contraseña cada 90 días para todos los administradores.</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Autenticación de Dos Factores (2FA)</h3>
                        <p className="text-sm text-gray-500 mb-3">Forzar 2FA para roles de Super Admin.</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    <Save className="w-4 h-4" /> Guardar Cambios
                </button>
            </div>
        </div>
    );
}

function NotificationSettings() {
    return (
        <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Configuración de Notificaciones</h3>
            <p className="text-gray-500">Próximamente: Configura alertas por correo y SMS.</p>
        </div>
    );
}

function TeamSettings() {
    const team = [
        { name: "Admin Principal", email: "admin@fundacion.org", role: "Super Admin" },
        { name: "Dr. Roberto", email: "roberto@fundacion.org", role: "Editor" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Equipo Administrativo</h2>
                <button className="text-sm text-purple-600 font-medium hover:underline">Invitar Miembro</button>
            </div>

            <div className="space-y-3">
                {team.map((member) => (
                    <div key={member.email} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold">
                                {member.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.email}</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                            {member.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
