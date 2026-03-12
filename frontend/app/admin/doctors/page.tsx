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
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DoctorModal from "./components/DoctorModal";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import Tooltip from "@/app/components/ui/Tooltip";

// Types
interface Doctor {
    id: string;
    fullName: string;
    cedula: string;
    phone: string;
    email: string;
    specialities: string[];
    licenseNumber: string;
    tipo_cedula: string;
    status: 'Activo' | 'Inactivo';
}

export default function DoctorsPage() {
    // --- State ---
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { addNotification } = useNotificationStore();
    const queryClient = useQueryClient();

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data, isLoading: loading } = useQuery({
        queryKey: ['doctors', currentPage, rowsPerPage, debouncedSearchTerm],
        queryFn: async () => {
            const response = await axiosClientInstance.get('/doctor', {
                params: {
                    skip: (currentPage - 1) * rowsPerPage,
                    take: rowsPerPage,
                    search: debouncedSearchTerm
                }
            });
            
            const mappedDoctors = response.data.doctors.map((doc: any) => ({
                id: doc.licenseNumber || doc.persona?.cedula || Math.random().toString(),
                fullName: doc.persona?.fullname || 'Sin Nombre',
                cedula: doc.persona?.cedula ? `${doc.persona.cedula}` : "",
                tipo_cedula: doc.persona?.tipo_cedula || "",
                phone: doc.persona?.telefono || "No aplica",
                email: doc.persona?.email || "No aplica",
                specialities: doc.doctor_especialidades?.map((spec: any) => spec.especialidad.nombre) || [],
                licenseNumber: doc.licenseNumber || "N/A",
                status: doc.status || "Activo"
            }));
            
            return {
                doctors: mappedDoctors as Doctor[],
                totalDoctors: response.data.total as number,
                totalPages: Math.ceil(response.data.total / rowsPerPage) as number
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
       addNotification("error", "esta funcion no esta disponible actualmente");
    };

    const openCreateModal = () => {
        setEditingDoctor(null);
        setIsModalOpen(true);
    };

    const openEditModal = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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

            {/* List */}
            {loading && doctors.length === 0 ? (
                <TableSkeleton columns={5} />
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Listado de Especialistas</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
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
                            {loading && doctors.length > 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Actualizando...
                                    </td>
                                </tr>
                            ) : (
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
                                                        {(doc.fullName || "Dr.").charAt(4) || "D"} {/* First letter after "Dr. " approx */}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{doc.fullName || "Sin Nombre"}</p>
                                                        <p className="text-xs text-gray-500">{doc.tipo_cedula}-{doc.cedula}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">{doc.specialities?.join(", ")}</span>
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
                                                        {doc.phone}
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
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
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
                            Mostrando {totalDoctors === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} a {Math.min(currentPage * rowsPerPage, totalDoctors)} de {totalDoctors} resultados
                        </span>
                        
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || loading}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="px-2 font-medium">{currentPage} / {totalPages > 0 ? totalPages : 1}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0 || loading}
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

