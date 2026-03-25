"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "@/app/components/ui/Tooltip";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import {
    Search,
    Filter,
    Eye,
    Clock,
    User,
    Database,
    ArrowRight,
    X,
    Calendar as CalendarIcon,
    Code,
    Activity
} from "lucide-react";

interface AuditLog {
    id: string;
    accion: 'CREAR' | 'ACTUALIZAR' | 'ELIMINAR';
    entidad: string; // TablaAfectada
    entidadId: string;
    usuario: {
        name: string;
        role: string;
        avatar?: string;
    };
    fecha: string;
    datosAnteriores?: any;
    datosNuevos?: any;
}

// Mock Data
const MOCK_LOGS: AuditLog[] = [
    {
        id: "log-001",
        accion: "ACTUALIZAR",
        entidad: "Pacientes",
        entidadId: "1",
        usuario: { name: "Admin Principal", role: "Administrador" },
        fecha: "2023-10-27T10:30:00",
        datosAnteriores: { nombre: "Juan", apellido: "Perez", estado: "Activo" },
        datosNuevos: { nombre: "Juan", apellido: "Perez", estado: "Inactivo" }
    },
    {
        id: "log-002",
        accion: "CREAR",
        entidad: "Consultas",
        entidadId: "101",
        usuario: { name: "Dr. Roberto", role: "Doctor" },
        fecha: "2023-10-27T09:15:00",
        datosNuevos: { pacienteId: "1", motivo: "Dolor de cabeza", diagnostico: "Migraña" }
    },
    {
        id: "log-003",
        accion: "ELIMINAR",
        entidad: "Citas",
        entidadId: "55",
        usuario: { name: "Maria Recepción", role: "Secretaria" },
        fecha: "2023-10-26T16:45:00",
        datosAnteriores: { fecha: "2023-10-30", paciente: "Ana Lopez" }
    },
    {
        id: "log-004",
        accion: "ACTUALIZAR",
        entidad: "Inventario",
        entidadId: "ITEM-202",
        usuario: { name: "Admin Principal", role: "Administrador" },
        fecha: "2023-10-26T14:20:00",
        datosAnteriores: { stock: 50 },
        datosNuevos: { stock: 100 }
    },
    {
        id: "log-005",
        accion: "CREAR",
        entidad: "Pacientes",
        entidadId: "2",
        usuario: { name: "Maria Recepción", role: "Secretaria" },
        fecha: "2023-10-26T11:00:00",
        datosNuevos: { nombre: "Carlos", apellido: "Ruiz", cedula: "V-12345678" }
    }
];

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS);
    const [busqueda, setBusqueda] = useState("");
    const [accionSeleccionada, setAccionSeleccionada] = useState<string>("TODOS");
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    // Simular carga inicial para demostración
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setCargando(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Lógica de filtrado
    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            log.entidad.toLowerCase().includes(busqueda.toLowerCase());
        const matchesAction = accionSeleccionada === "TODOS" || log.accion === accionSeleccionada;
        return matchesSearch && matchesAction;
    });

    const getActionColor = (accion: string) => {
        switch (accion) {
            case "CREAR": return "text-green-600 bg-green-50 border-green-100";
            case "ACTUALIZAR": return "text-blue-600 bg-blue-50 border-blue-100";
            case "ELIMINAR": return "text-red-600 bg-red-50 border-red-100";
            default: return "text-gray-600 bg-gray-50 border-gray-100";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('es-VE', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Registro de Auditoría</h1>
                <p className="text-gray-500 mt-1">Monitoreo de cambios y actividad en el sistema.</p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
                {/* Barra de Herramientas */}
                <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por usuario o entidad..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <select
                                value={accionSeleccionada}
                                onChange={(e) => setAccionSeleccionada(e.target.value)}
                                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                            >
                                <option value="TODOS">Todas las Acciones</option>
                                <option value="CREAR">Crear</option>
                                <option value="ACTUALIZAR">Actualizar</option>
                                <option value="ELIMINAR">Eliminar</option>
                            </select>
                        </div>
                    </div>
                    {/* Date Picker Placeholder */}
                    <button className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>Últimos 30 días</span>
                    </button>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-x-auto">
                    {cargando ? (
                        <div className="p-4">
                            <TableSkeleton columns={5} />
                        </div>
                    ) : (
                        <>
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha / Hora</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acción</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Entidad Afectada</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <AnimatePresence>
                                        {filteredLogs.map((log) => (
                                            <motion.tr
                                                key={log.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="hover:bg-gray-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                        {formatDate(log.fecha)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                                                            {log.usuario.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{log.usuario.name}</p>
                                                            <p className="text-xs text-gray-500">{log.usuario.role}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getActionColor(log.accion)}`}>
                                                        {log.accion}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <Database className="w-4 h-4 text-gray-400" />
                                                        <span className="font-medium">{log.entidad}</span>
                                                        <span className="text-gray-400 text-xs">#{log.entidadId}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Tooltip content="Ver detalle de cambios" position="top">
                                                        <button
                                                            onClick={() => setSelectedLog(log)}
                                                            className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-lg transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </Tooltip>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                            {filteredLogs.length === 0 && (
                                <div className="p-12 text-center text-gray-500">
                                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p>No se encontraron registros de auditoría con los filtros actuales.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Change Details Modal */}
            <AnimatePresence>
                {selectedLog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLog(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
                        >
                            {/* Cabecera del Modal */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${selectedLog.accion === 'CREAR' ? 'bg-green-100 text-green-700' :
                                        selectedLog.accion === 'ACTUALIZAR' ? 'bg-blue-100 text-blue-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Detalle de Cambios</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <span className="font-medium">{selectedLog.accion}</span> en
                                            <span className="font-medium text-gray-700">{selectedLog.entidad}</span>
                                            <span className="text-gray-400">#{selectedLog.entidadId}</span>
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contenido del Modal - Visor JSON */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Old Data */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-400" />
                                            Valor Anterior
                                        </h4>
                                        <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 font-mono text-xs text-gray-700 overflow-x-auto">
                                            {selectedLog.datosAnteriores ? (
                                                <pre>{JSON.stringify(selectedLog.datosAnteriores, null, 2)}</pre>
                                            ) : (
                                                <span className="text-gray-400 italic">-- Sin datos previos (Creación) --</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arrow Indicator (Desktop) */}
                                    <div className="hidden md:flex flex-col justify-center items-center text-gray-300">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>

                                    {/* Valor Nuevo */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400" />
                                            Valor Nuevo
                                        </h4>
                                        <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 font-mono text-xs text-gray-700 overflow-x-auto">
                                            {selectedLog.datosNuevos ? (
                                                <pre>{JSON.stringify(selectedLog.datosNuevos, null, 2)}</pre>
                                            ) : (
                                                <span className="text-gray-400 italic">-- Sin datos nuevos (Eliminación) --</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between text-xs text-gray-400 p-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <User className="w-3 h-3" />
                                        <span>Realizado por: <strong className="text-gray-600">{selectedLog.usuario.name}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatDate(selectedLog.fecha)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
