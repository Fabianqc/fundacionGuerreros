"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Stethoscope,
    Edit,
    Trash2,
    Award,
    Phone,
    Mail,
    Loader2
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DoctorModal from "./components/DoctorModal";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import Tooltip from "@/app/components/ui/Tooltip";

interface Doctor {
    id: string;
    fullname: string;
    cedula: string;
    telefono: string;
    email: string;
    direccion: string;
    sexo: string;
    nacimiento: any;
    especialidades: string[];
    licenseNumber: string;
    tipo_cedula: string;
    status: 'Activo' | 'Inactivo';
}

export default function DoctorsPage() {
    // --- Estado ---
    const [busqueda, setBusqueda] = useState("");
    const [busquedaDebounce, setBusquedaDebounce] = useState("");

    // Estado del Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<{ cedula: string; tipo_cedula: string } | null>(null);

    const [paginaActual, setPaginaActual] = useState(1);
    const [filasPorPagina, setFilasPorPagina] = useState(10);
    const { addNotification } = useNotificationStore();
    const queryClient = useQueryClient();

    useEffect(() => {
        const timer = setTimeout(() => setBusquedaDebounce(busqueda), 500);
        return () => clearTimeout(timer);
    }, [busqueda]);

    const { data, isLoading: cargando, isFetching } = useQuery({
        queryKey: ['doctors', paginaActual, filasPorPagina, busquedaDebounce],
        queryFn: async () => {
            const response = await axiosClientInstance.get('/doctor', {
                params: {
                    skip: (paginaActual - 1) * filasPorPagina,
                    take: filasPorPagina,
                    search: busquedaDebounce
                }
            });
            
            const mappedDoctors = response.data.doctors.map((doc: any) => ({
                id: doc.licenseNumber || doc.persona?.cedula || Math.random().toString(),
                fullname: doc.persona?.fullname || 'Sin Nombre',
                cedula: doc.persona?.cedula ? `${doc.persona.cedula}` : "",
                tipo_cedula: doc.persona?.tipo_cedula || "",
                telefono: doc.persona?.telefono || "No aplica",
                email: doc.persona?.email || "No aplica",
                direccion: doc.persona?.direccion || "",
                sexo: doc.persona?.sexo || "",
                nacimiento: doc.persona?.nacimiento || null,
                especialidades: doc.doctor_especialidades?.map((spec: any) => spec.especialidad.nombre) || [],
                licenseNumber: doc.licenseNumber || "N/A",
                status: doc.status || "Activo"
            }));
            
            return {
                doctors: mappedDoctors as Doctor[],
                totalDoctors: response.data.total as number,
                totalPages: Math.ceil(response.data.total / filasPorPagina) as number
            };
        }
    });

    const doctors = data?.doctors || [];
    const totalDoctors = data?.totalDoctors || 0;
    const totalPages = data?.totalPages || 0;

    // --- Handlers ---
    const handleCreateDoctor = () => {
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
    };

    const handleUpdateDoctor = () => {
        setEditingDoctor(null);
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
    };

    const handleDeleteDoctor = (id: string) => {
       addNotification("error", "esta función no está disponible actualmente");
    };

    const openCreateModal = () => {
        setEditingDoctor(null);
        setIsModalOpen(true);
    };

    const openEditModal = (doctor: Doctor) => {
        setEditingDoctor({ cedula: doctor.cedula, tipo_cedula: doctor.tipo_cedula });
        setIsModalOpen(true);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
        setPaginaActual(1);
    };
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Doctores</h1>
                    <p className="text-gray-500 mt-1">Gestión del personal médico de la fundación.</p>
                </div>

                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Registrar Doctor</span>
                </button>
            </div>

            {/* Lista */}
            {cargando && doctors.length === 0 ? (
                <TableSkeleton columns={5} />
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                {/* Barra de Herramientas */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Listado de Especialistas</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={busqueda}
                            onChange={handleSearchChange}
                            placeholder="Buscar por nombre, cédula..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Profesional</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Especialidad</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isFetching && doctors.length > 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 text-purple-600 animate-pulse font-medium">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sincronizando cambios...
                                        </div>
                                    </td>
                                </tr>
                            ) : null}
                            {!cargando && (
                                <AnimatePresence>
                                    {doctors.map((doc) => (
                                        <motion.tr
                                            key={doc.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                            className="group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                                                        {(doc.fullname || "Dr.").charAt(4) || "D"} 
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{doc.fullname || "Sin Nombre"}</p>
                                                        <p className="text-xs text-gray-500">{doc.tipo_cedula}-{doc.cedula}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">{doc.especialidades?.join(", ")}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Award className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-500">{doc.licenseNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                        {doc.telefono}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                        {doc.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${doc.status === 'Activo'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Tooltip content="Editar Info" position="top">
                                                        <button
                                                            onClick={() => openEditModal(doc)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-95"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip content="Dar de Baja" position="top">
                                                        <button
                                                            onClick={() => handleDeleteDoctor(doc.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
                    <div className="flex items-center gap-2">
                        <span>Mostrar</span>
                        <select
                            value={filasPorPagina}
                            onChange={(e) => {
                                setFilasPorPagina(Number(e.target.value));
                                setPaginaActual(1);
                            }}
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-1.5 focus:outline-none"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <span>filas por página</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>
                            Mostrando {totalDoctors === 0 ? 0 : (paginaActual - 1) * filasPorPagina + 1} a {Math.min(paginaActual * filasPorPagina, totalDoctors)} de {totalDoctors} resultados
                        </span>
                        
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                                disabled={paginaActual === 1 || cargando}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="px-2 font-medium">{paginaActual} / {totalPages > 0 ? totalPages : 1}</span>
                            <button
                                onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPages))}
                                disabled={paginaActual === totalPages || totalPages === 0 || cargando}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}

            <DoctorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingDoctor ? handleUpdateDoctor : handleCreateDoctor}
                initialData={editingDoctor}
            />
        </div>
    );
}

