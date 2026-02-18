"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Stethoscope,
    MoreVertical,
    Edit,
    Trash2,
    Phone,
    Mail,
    Award
} from "lucide-react";
import DoctorModal from "./components/DoctorModal";
import { useNotification } from "@/app/context/NotificationContext";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";

// Types
interface Doctor {
    id: string;
    fullName: string;
    cedula: string;
    phone: string;
    email: string;
    specialities: string[];
    licenseNumber: string;
    status: 'Activo' | 'Inactivo';
}

export default function DoctorsPage() {
    // --- State ---
    const [doctors, setDoctors] = useState<Doctor[]>([
        {
            id: "doc-001",
            fullName: "Dr. Roberto Casas",
            cedula: "V-12345678",
            phone: "0414-1234567",
            email: "roberto@casas.com",
            specialities: ["Medicina General"],
            licenseNumber: "CMD-102030",
            status: "Activo"
        },
        {
            id: "doc-002",
            fullName: "Dra. Ana Anatomía",
            cedula: "V-87654321",
            phone: "0412-7654321",
            email: "ana@hospital.com",
            specialities: ["Cardiología", "Medicina Interna"],
            licenseNumber: "CMD-998877",
            status: "Activo"
        },
        {
            id: "doc-003",
            fullName: "Dr. Gregory House",
            cedula: "E-55443322",
            phone: "0416-5555555",
            email: "house@princeton.edu",
            specialities: ["Diagnóstico", "Nefrología", "Infectología"],
            licenseNumber: "CMD-000666",
            status: "Inactivo"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

    // --- Handlers ---
    const handleCreateDoctor = (data: Omit<Doctor, "id">) => {
        const newDoctor: Doctor = {
            id: `doc-${Date.now()}`,
            ...data
        };
        setDoctors([...doctors, newDoctor]);
        setIsModalOpen(false);
    };

    const handleUpdateDoctor = (data: Omit<Doctor, "id">) => {
        if (!editingDoctor) return;

        setDoctors(prev => prev.map(doc => {
            if (doc.id === editingDoctor.id) {
                return { ...doc, ...data };
            }
            return doc;
        }));
        setEditingDoctor(null);
        setIsModalOpen(false);
    };

    const handleDeleteDoctor = (id: string) => {
        if (confirm("¿Está seguro de eliminar este doctor?")) {
            setDoctors(prev => prev.filter(doc => doc.id !== id));
        }
    };

    const openCreateModal = () => {
        setEditingDoctor(null);
        setIsModalOpen(true);
    };

    const openEditModal = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setIsModalOpen(true);
    };

    const filteredDoctors = doctors.filter(doc =>
        (doc.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (doc.specialities?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (doc.cedula?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const Alldoctor = async () => {
        try {
            const response = await axiosClientInstance.get('/doctor');
            console.log(response.data);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    useEffect(() => {
        Alldoctor();
    }, []);
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Listado de Especialistas</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre, especialidad..."
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
                            <AnimatePresence>
                                {filteredDoctors.map((doc) => (
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
                                                    <p className="text-xs text-gray-500">{doc.cedula}</p>
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
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <button
                                                    onClick={() => openEditModal(doc)}
                                                    className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDoctor(doc.id)}
                                                    className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <DoctorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingDoctor ? handleUpdateDoctor : handleCreateDoctor}
                initialData={editingDoctor}
            />
        </div>
    );
}

