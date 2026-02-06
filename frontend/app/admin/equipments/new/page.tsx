"use client";

import { motion } from "framer-motion";
import {
    Package,
    Tag,
    Hash,
    Archive,
    Save,
    X,
    Info,
    Layers
} from "lucide-react";
import Link from "next/link";

export default function NewEquipmentPage() {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registrar Equipo</h1>
                    <p className="text-gray-500 mt-1">Añadir nueva ayuda técnica al inventario.</p>
                </div>
                <Link
                    href="/admin/equipments"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span>Cancelar</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
                <div className="p-8 space-y-8">

                    {/* Basic Info */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <Package className="w-5 h-5 text-purple-600" />
                            Información Básica
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Equipo / Modelo</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Silla de Ruedas Plegable Standard"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                                <div className="relative">
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                        <option>Seleccionar...</option>
                                        <option>Movilidad</option>
                                        <option>Mobiliario Clínico</option>
                                        <option>Insumos Médicos</option>
                                        <option>Accesorios</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Código de Activo (SKU)</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Ej. EQ-2024-001"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Inventory Details */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <Archive className="w-5 h-5 text-purple-600" />
                            Inventario y Estado
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad Inicial</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        defaultValue="1"
                                        min="1"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Condición</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                    <option>Nuevo</option>
                                    <option>Usado - Excelente Estado</option>
                                    <option>Usado - Buen Estado</option>
                                    <option>Requiere Mantenimiento</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción / Notas Adicionales</label>
                                <div className="relative">
                                    <Info className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        rows={4}
                                        placeholder="Detalles técnicos, dimensiones, peso máximo soportado, etc."
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50 focus:bg-white resize-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    <Link href="/admin/equipments">
                        <button className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200/50 rounded-xl transition-colors">
                            Cancelar
                        </button>
                    </Link>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                        <Save className="w-5 h-5" />
                        Registrar Equipo
                    </button>
                </div>
            </div>
        </div>
    );
}
