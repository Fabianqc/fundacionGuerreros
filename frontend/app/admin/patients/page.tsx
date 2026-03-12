"use client";

import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    Phone,
    Mail,
    Download,
    MoreVertical,
    Edit
} from "lucide-react";
import CreatePatientModal from "./components/CreatePatientModal";
import { useQuery } from "@tanstack/react-query";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import Tooltip from "@/app/components/ui/Tooltip";
import { useState, useEffect } from "react";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
interface Patient {
    Fullname: string;
    tipo_cedula: string;
    cedula: string;
    email: string;
    telefono: string;
    direccion: string;
    sexo: string;
    nacimiento: any;
    ultimavisita: string;
    status: string;
}
export default function PatientsPage() {
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // State for Modal
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page on new search
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const skip = (page - 1) * take;

    const { data, isLoading: loading, isFetching, isError, error: queryError, refetch } = useQuery({
        queryKey: ["patients", skip, take, debouncedSearch],
        queryFn: async () => {
            const response = await axiosClientInstance.get(`/paciente`, {
                params: {
                    search: debouncedSearch,
                    skip,
                    take,
                }
            });
            const mappedPatients = response.data.pacientes.map((p: any) => {
                const persona = p.persona || p;
                return {
                    ...p,
                    ...persona, // Spread persona to ensure we have all fields even if nested
                    Fullname: persona.Fullname || persona.fullname || p.Fullname || p.fullname || "Sin Nombre",
                    fullname: persona.fullname || persona.Fullname || p.fullname || p.Fullname || "Sin Nombre",
                    telefono: persona.telefono || persona.Telefono || p.telefono || p.phone || "",
                    direccion: persona.direccion || persona.Direccion || p.direccion || "",
                    sexo: persona.sexo || persona.Sexo || p.sexo || "",
                    nacimiento: persona.nacimiento || persona.Nacimiento || p.nacimiento || null,
                    email: persona.email || persona.Email || p.email || ""
                };
            });
            return {
                pacientes: mappedPatients as Patient[],
                pages: response.data.pages as number,
                count: response.data.count as number
            };
        }
    });

    const error = isError ? handleAxiosError(queryError) : null;
    const patients = data?.pacientes || [];
    const totalPages = data?.pages || 1;
    const totalItems = data?.count || 0;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Activo": return "bg-green-100 text-green-700";
            case "Inactivo": return "bg-red-100 text-red-700";
            case "Pendiente": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Modal */}
            <CreatePatientModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setSelectedPatient(null);
                }}
                onSuccess={() => refetch()}
                patientToEdit={selectedPatient}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                        Gestión de Pacientes
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Administra la información de los pacientes</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo Paciente
                    </button>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar paciente por nombre, cédula..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[500px]">
                    {isFetching && patients.length > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-100 overflow-hidden z-10">
                            <motion.div 
                                className="h-full bg-purple-600"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </div>
                    )}
                    {loading && patients.length === 0 ? (
                        <TableSkeleton columns={6} />
                    ) : (
                        <>
                            {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Identificación</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Última Visita</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {patients.map((patient) => (
                                <motion.tr
                                    key={patient.cedula}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                    className="transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                                                {userInitial(patient.Fullname)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{patient.Fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                            {patient.tipo_cedula} - {patient.cedula}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3" /> {patient.telefono}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {patient.ultimavisita || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                        <Tooltip content="Opciones" position="top">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === patient.cedula ? null : patient.cedula)}
                                                className="text-gray-400 hover:text-purple-600 transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </Tooltip>

                                        {openMenuId === patient.cedula && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 py-1 animate-fadeIn">
                                                <button
                                                    onClick={() => {
                                                        setSelectedPatient(patient);
                                                        setIsCreateModalOpen(true);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors flex items-center gap-2"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Actualizar Datos
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                        </>
                    )}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500">
                            Mostrando <span className="font-medium text-gray-900">{Math.min(skip + 1, totalItems)}</span> a <span className="font-medium text-gray-900">{Math.min(skip + take, totalItems)}</span> de <span className="font-medium text-gray-900">{totalItems}</span> resultados
                        </p>
                        <select
                            value={take}
                            onChange={(e) => {
                                setTake(Number(e.target.value));
                                setPage(1);
                            }}
                            className="text-sm border border-gray-200 rounded-lg py-1 px-2 focus:outline-none focus:border-purple-500 text-gray-900"
                        >
                            <option value={5}>5 por página</option>
                            <option value={10}>10 por página</option>
                            <option value={20}>20 por página</option>
                            <option value={50}>50 por página</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={page >= totalPages}
                            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md shadow-purple-200 transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function userInitial(name: string) {
    return name[0].toUpperCase();
}