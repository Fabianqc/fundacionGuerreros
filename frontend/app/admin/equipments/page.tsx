"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Accessibility,
    Package,
    RefreshCcw,
    AlertTriangle,
    MoreVertical,
    Edit,
    Archive,
    User,
    Check,
    X,
    Calendar,
    FileText,
    Trash2,
    CirclePlus
} from "lucide-react";
import CreateEquipmentModal from "./components/CreateEquipmentModal";
import AddStockModal from "./components/AddStockModal";

// Types
interface Equipment {
    id: string;
    name: string;
    category: string;
    totalStock: number;
    available: number;
    loaned: number;
    status: 'Disponible' | 'Bajo Stock' | 'Crítico' | 'Agotado';
    lastMaintenance: string;
}

interface Patient {
    id: string;
    fullName: string;
    cedula: string;
}

export default function EquipmentsPage() {
    // --- State ---
    const [equipment, setEquipment] = useState<Equipment[]>([
        {
            id: "EQ-2024-001",
            name: "Silla de Ruedas Estándar",
            category: "Movilidad",
            totalStock: 15,
            available: 5,
            loaned: 10,
            status: "Bajo Stock",
            lastMaintenance: "15 Ene 2026"
        },
        {
            id: "EQ-2024-002",
            name: "Muletas de Aluminio (Par)",
            category: "Movilidad",
            totalStock: 30,
            available: 28,
            loaned: 2,
            status: "Disponible",
            lastMaintenance: "01 Feb 2026"
        },
        {
            id: "EQ-2024-003",
            name: "Cama Clínica Eléctrica",
            category: "Mobiliario",
            totalStock: 5,
            available: 1,
            loaned: 4,
            status: "Crítico",
            lastMaintenance: "20 Ene 2026"
        },
        {
            id: "EQ-2024-004",
            name: "Andadera Plegable",
            category: "Movilidad",
            totalStock: 20,
            available: 15,
            loaned: 5,
            status: "Disponible",
            lastMaintenance: "10 Dic 2025"
        },
        {
            id: "EQ-2024-005",
            name: "Colchón Antiescaras",
            category: "Accesorios",
            totalStock: 12,
            available: 0,
            loaned: 12,
            status: "Agotado",
            lastMaintenance: "N/A"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
    const [editingItem, setEditingItem] = useState<Equipment | null>(null);

    // Assignment Form State
    const [patientSearchCedula, setPatientSearchCedula] = useState("");
    const [tipoCedula, setTipoCedula] = useState("V");
    const [foundPatient, setFoundPatient] = useState<Patient | null>(null);
    const [assignmentDate, setAssignmentDate] = useState(new Date().toISOString().split('T')[0]);
    const [observation, setObservation] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // --- Stats Calculation ---
    const stats = [
        { title: "Total Activos", value: equipment.reduce((acc, item) => acc + item.totalStock, 0), icon: Package, color: "bg-blue-500" },
        { title: "En Préstamo", value: equipment.reduce((acc, item) => acc + item.loaned, 0), icon: Accessibility, color: "bg-purple-500" },
        { title: "Disponibles", value: equipment.reduce((acc, item) => acc + item.available, 0), icon: RefreshCcw, color: "bg-green-500" },
        { title: "Críticos/Agotados", value: equipment.filter(e => e.status === 'Crítico' || e.status === 'Agotado').length, icon: AlertTriangle, color: "bg-orange-500" },
    ];

    // --- Handlers ---

    const handleSearchPatient = () => {
        setIsSearching(true);
        setFoundPatient(null);

        // Mock API Call - In real app, send tipoCedula + patientSearchCedula
        setTimeout(() => {
            if (patientSearchCedula === "12345678") {
                setFoundPatient({
                    id: "p-001",
                    fullName: "Maria Gonzalez",
                    cedula: `${tipoCedula}-${patientSearchCedula}`
                });
            } else {
                // Not found logic could go here (e.g. show error)
            }
            setIsSearching(false);
        }, 600);
    };

    const handleCreateEquipment = (data: Omit<Equipment, "id" | "available" | "loaned" | "lastMaintenance">) => {
        const newId = `EQ-2026-${String(equipment.length + 1).padStart(3, '0')}`;
        const newEquipment: Equipment = {
            id: newId,
            ...data,
            available: data.totalStock,
            loaned: 0,
            lastMaintenance: "N/A"
        };
        setEquipment([...equipment, newEquipment]);
        setIsCreateModalOpen(false);
    };

    const handleUpdateEquipment = (data: Omit<Equipment, "id" | "available" | "loaned" | "lastMaintenance">) => {
        if (!editingItem) return;

        setEquipment(prev => prev.map(item => {
            if (item.id === editingItem.id) {
                const newAvailable = data.totalStock - item.loaned;
                return {
                    ...item,
                    ...data,
                    available: newAvailable
                };
            }
            return item;
        }));
        setEditingItem(null);
        setIsCreateModalOpen(false);
    };

    const handleDeleteEquipment = (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer.")) {
            setEquipment(prev => prev.filter(item => item.id !== id));
        }
    };

    const openCreateModal = () => {
        setEditingItem(null);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (item: Equipment) => {
        setEditingItem(item);
        setIsCreateModalOpen(true);
    };

    const openAddStockModal = (item: Equipment) => {
        setSelectedItem(item);
        setIsAddStockModalOpen(true);
    };

    const handleAddStock = (quantity: number, source: string, date: string, observation: string) => {
        if (!selectedItem) return;

        // Log transaction (Mock)
        console.log(`Adding ${quantity} to ${selectedItem.name}. Source: ${source}, Date: ${date}, Obs: ${observation}`);

        setEquipment(prev => prev.map(item => {
            if (item.id === selectedItem.id) {
                const newTotal = item.totalStock + quantity;
                const newAvailable = item.available + quantity;
                return {
                    ...item,
                    totalStock: newTotal,
                    available: newAvailable,
                    status: newAvailable > 0 ? 'Disponible' : item.status
                };
            }
            return item;
        }));
        setIsAddStockModalOpen(false);
    };

    const openAssignModal = (item: Equipment) => {
        setSelectedItem(item);
        setPatientSearchCedula("");
        setTipoCedula("V");
        setFoundPatient(null);
        setObservation("");
        setIsAssignModalOpen(true);
    };

    const handleConfirmAssignment = () => {
        if (!selectedItem || !foundPatient) return;

        // Update Stock Logic
        const updatedEquipment = equipment.map(item => {
            if (item.id === selectedItem.id) {
                const newAvailable = item.available - 1;
                const newLoaned = item.loaned + 1;
                let newStatus = item.status;

                if (newAvailable === 0) newStatus = 'Agotado';
                else if (newAvailable <= 5) newStatus = 'Bajo Stock'; // Simple threshold example

                return {
                    ...item,
                    available: newAvailable,
                    loaned: newLoaned,
                    status: newStatus
                };
            }
            return item;
        });

        setEquipment(updatedEquipment);
        setIsAssignModalOpen(false);
        // Here you would also call the API to create the 'AyudasTecnica' record
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Disponible": return "text-green-700 bg-green-100";
            case "Bajo Stock": return "text-orange-700 bg-orange-100";
            case "Crítico": return "text-red-700 bg-red-100";
            case "Agotado": return "text-gray-700 bg-gray-200";
            default: return "text-gray-700 bg-gray-100";
        }
    };

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Ayudas Técnicas</h1>
                    <p className="text-gray-500 mt-1">Gestión de inventario y préstamos de equipos.</p>
                </div>

                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Registrar Nuevo Equipo</span>
                </button>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl text-white shadow-lg ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Inventory List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Inventario General</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar equipo por nombre o código..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Equipo</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Total</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Disponibles</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {filteredEquipment.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                                        className="group"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-400 font-mono">{item.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                            {item.totalStock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${item.available > 0 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                                                {item.available}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openAssignModal(item)}
                                                    disabled={item.available === 0}
                                                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-lg shadow-sm transition-all ${item.available > 0
                                                        ? 'bg-green-600 hover:bg-green-700 hover:scale-105'
                                                        : 'bg-gray-300 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <Accessibility className="w-3.5 h-3.5" />
                                                    {item.available > 0 ? 'Asignar' : 'Agotado'}
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openAddStockModal(item)}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Añadir Stock"
                                                >
                                                    <CirclePlus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEquipment(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

            {/* --- Assignment Modal --- */}
            <CreateEquipmentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={editingItem ? handleUpdateEquipment : handleCreateEquipment}
                initialData={editingItem}
            />

            <AddStockModal
                isOpen={isAddStockModalOpen}
                onClose={() => setIsAddStockModalOpen(false)}
                itemName={selectedItem?.name || ""}
                onConfirm={handleAddStock}
            />

            {/* --- Assignment Modal --- */}
            <AnimatePresence>
                {isAssignModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsAssignModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Asignar Equipo</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Registrando entrega de: <strong className="text-purple-700">{selectedItem.name}</strong>
                                </p>

                                <div className="space-y-4">
                                    {/* Step 1: Find Patient */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Beneficiario</label>
                                        {!foundPatient ? (
                                            <div className="flex gap-2">
                                                <div className="flex-1 flex gap-2">
                                                    <select
                                                        value={tipoCedula}
                                                        onChange={(e) => setTipoCedula(e.target.value)}
                                                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-gray-50 font-medium"
                                                    >
                                                        <option value="V">V-</option>
                                                        <option value="E">E-</option>
                                                        <option value="J">J-</option>
                                                        <option value="G">G-</option>
                                                        <option value="P">P-</option>
                                                    </select>
                                                    <div className="relative flex-1">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={patientSearchCedula}
                                                            onChange={(e) => setPatientSearchCedula(e.target.value)}
                                                            placeholder="Cédula (Ej: 12345678)"
                                                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleSearchPatient}
                                                    disabled={!patientSearchCedula || isSearching}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {isSearching ? '...' : 'Buscar'}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xs">
                                                        {foundPatient.fullName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{foundPatient.fullName}</p>
                                                        <p className="text-xs text-gray-500">{foundPatient.cedula}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => setFoundPatient(null)} className="text-gray-400 hover:text-red-500">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Step 2: Date & Observation */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Fecha de Entrega</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={assignmentDate}
                                                    onChange={(e) => setAssignmentDate(e.target.value)}
                                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Observaciones</label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <textarea
                                                    rows={3}
                                                    value={observation}
                                                    onChange={(e) => setObservation(e.target.value)}
                                                    placeholder="Condiciones de entrega, precauciones, etc."
                                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmAssignment}
                                    disabled={!foundPatient}
                                    className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-md shadow-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Confirmar Entrega
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

