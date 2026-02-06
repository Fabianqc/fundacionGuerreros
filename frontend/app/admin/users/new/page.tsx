"use client";

import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Shield,
    Save,
    X,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewUserPage() {
    const [role, setRole] = useState("Viewer");

    const roles = [
        {
            id: "Admin",
            label: "Administrador",
            description: "Acceso total a todas las funciones del sistema.",
            color: "bg-purple-100 border-purple-200 text-purple-700"
        },
        {
            id: "Editor",
            label: "Editor",
            description: "Puede gestionar contenido (pacientes, consultas) pero no configuraciones.",
            color: "bg-blue-100 border-blue-200 text-blue-700"
        },
        {
            id: "Doctor",
            label: "Médico",
            description: "Acceso limitado a sus propios pacientes y consultas.",
            color: "bg-green-100 border-green-200 text-green-700"
        },
        {
            id: "Viewer",
            label: "Visualizador",
            description: "Solo lectura. No puede realizar cambios.",
            color: "bg-gray-100 border-gray-200 text-gray-700"
        },
    ];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nuevo Usuario</h1>
                    <p className="text-gray-500 mt-1">Crear una cuenta de acceso al sistema.</p>
                </div>
                <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span>Cancelar</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
                <div className="p-8 space-y-8">

                    {/* Account Details */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <User className="w-5 h-5 text-purple-600" />
                            Detalles de la Cuenta
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Juan Pérez"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="ejemplo@fundacion.org"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Temporal</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Se solicitará cambiar la contraseña en el primer inicio de sesión.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Role Selection */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <Shield className="w-5 h-5 text-purple-600" />
                            Permisos y Rol
                        </h2>

                        <div className="grid grid-cols-1 gap-3">
                            {roles.map((r) => (
                                <div
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${role === r.id
                                            ? "border-purple-500 bg-purple-50/50"
                                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${role === r.id ? "border-purple-600 bg-purple-600" : "border-gray-300"
                                        }`}>
                                        {role === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900">{r.label}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${r.color}`}>
                                                {r.id}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">{r.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Status */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Estado de la Cuenta</h3>
                                <p className="text-sm text-gray-500">Activa inmediatamente tras la creación.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    <Link href="/admin/settings">
                        <button className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200/50 rounded-xl transition-colors">
                            Cancelar
                        </button>
                    </Link>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                        <Save className="w-5 h-5" />
                        Crear Usuario
                    </button>
                </div>
            </div>
        </div>
    );
}
