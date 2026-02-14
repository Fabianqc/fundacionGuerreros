"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Plus, Check, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Pathology {
    id: string | number;
    name: string;
}

interface PathologySelectorProps {
    value?: string; // Currently passing name or ID
    onChange: (value: string) => void;
    error?: string;
}

// Mock Data
const MOCK_PATHOLOGIES: Pathology[] = [
    { id: "1", name: "Hipertensión Arterial" },
    { id: "2", name: "Diabetes Mellitus Tipo 2" },
    { id: "3", name: "Infección Respiratoria Aguda" },
    { id: "4", name: "Lumbalgia Mecánica" },
    { id: "5", name: "Asma Bronquial" },
    { id: "6", name: "Gastritis Aguda" },
];

export default function PathologySelector({ value, onChange, error }: PathologySelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Pathology[]>(MOCK_PATHOLOGIES);
    const [selectedPathology, setSelectedPathology] = useState<Pathology | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initialize selected value
    useEffect(() => {
        if (value) {
            const found = options.find(p => p.name === value || p.id === value);
            if (found) {
                setSelectedPathology(found);
                setSearchTerm(found.name);
            }
        }
    }, [value]);

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                // Reset search term to selected value if closed without selecting
                if (selectedPathology) {
                    setSearchTerm(selectedPathology.name);
                } else {
                    setSearchTerm("");
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedPathology]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setIsOpen(true);
        // Filter logic here or API call
    };

    const handleSelect = (pathology: Pathology) => {
        setSelectedPathology(pathology);
        setSearchTerm(pathology.name);
        onChange(pathology.name); // Passing name as per current form structure, could change to ID
        setIsOpen(false);
    };

    const handleCreate = () => {
        setIsLoading(true);
        // Simulate API create
        setTimeout(() => {
            const newPathology = { id: Date.now().toString(), name: searchTerm };
            setOptions(prev => [...prev, newPathology]);
            handleSelect(newPathology);
            setIsLoading(false);
        }, 600);
    };

    const filteredOptions = options.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Buscar o crear patología..."
                    className={`w-full pl-9 pr-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200"
                        }`}
                />
                {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && searchTerm && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {filteredOptions.length > 0 ? (
                            <ul className="py-1">
                                {filteredOptions.map((option) => (
                                    <li
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center justify-between group"
                                    >
                                        <span className="text-sm text-gray-700">{option.name}</span>
                                        {selectedPathology?.id === option.id && (
                                            <Check className="w-4 h-4 text-purple-600" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-3 text-center">
                                <p className="text-xs text-gray-500 mb-2">No se encontraron resultados para "{searchTerm}"</p>
                                <button
                                    onClick={handleCreate}
                                    disabled={isLoading}
                                    className="w-full py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Crear "{searchTerm}"
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
