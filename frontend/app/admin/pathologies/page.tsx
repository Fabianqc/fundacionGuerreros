"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Activity,
    Users,
    Edit,
    Trash2,
    AlertCircle,
    Check,
    Loader2
} from "lucide-react";

interface Pathology {
    id: number | string;
    name: string;
    description: string;
    category: string;
    patientsCount: number;
    riskLevel: string;
}

export default function PathologiesPage() {
    // Mock Data
    const [pathologies, setPathologies] = useState<Pathology[]>([
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
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const filteredPathologies = pathologies.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setIsCreating(true);
        // Simulate API call
        setTimeout(() => {
            const newPathology: Pathology = {
                id: Date.now(),
                name: searchTerm,
                description: "Nueva patología registrada",
                category: "General",
                patientsCount: 0,
                riskLevel: "Bajo"
            };
            setPathologies(prev => [newPathology, ...prev]);
            setSearchTerm("");
            setIsCreating(false);
        }, 800);
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case "Alto": return "text-red-600 bg-red-50 border-red-100";
            case "Medio": return "text-orange-600 bg-orange-50 border-orange-100";
            case "Bajo": return "text-green-600 bg-green-50 border-green-100";
            default: return "text-gray-600 bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Patologías</h1>
                <p className="text-gray-500 mt-1">Administración de condiciones clínicas.</p>
            </div>

            {/* Main Content: Search + List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                {/* Enhanced Search Toolbar */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar patología para gestionar o crear..."
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                        />
                        {/* Inline Create Action */}
                        <AnimatePresence>
                            {searchTerm && filteredPathologies.length === 0 && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={handleCreate}
                                    disabled={isCreating}
                                    className="absolute right-2 top-2 bottom-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
                                >
                                    {isCreating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creando...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Crear "{searchTerm}"
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Si la patología no existe, escríbela y presiona "Crear".
                    </p>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-x-auto">
                    {filteredPathologies.length > 0 ? (
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
                                <AnimatePresence>
                                    {filteredPathologies.map((pathology) => (
                                        <motion.tr
                                            key={pathology.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            layout
                                            className="group hover:bg-gray-50/50 transition-colors"
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
                                </AnimatePresence>
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No se encontraron patologías</h3>
                            <p className="text-gray-500 max-w-sm mt-1">
                                No hay resultados para "{searchTerm}". Usa el botón superior para crearla.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center text-xs text-gray-400">
                    <span>Total: {filteredPathologies.length} patologías</span>
                    <span>Mostrando resultados filtrados</span>
                </div>
            </div>
        </div>
    );
}
