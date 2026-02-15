"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Address {
    display_name: string;
    lat: string;
    lon: string;
    address?: {
        country?: string;
        state?: string;
        city?: string;
        town?: string;
        village?: string;
    };
}

interface AddressAutocompleteProps {
    value?: string;
    onChange: (address: string) => void;
    onSelectFull?: (address: Address) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function AddressAutocomplete({ value = "", onChange, onSelectFull, placeholder = "Buscar dirección...", disabled = false }: AddressAutocompleteProps) {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Sync internal state with external value changes
    useEffect(() => {
        setQuery(value);
    }, [value]);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2 && isOpen) { // Only search if open to avoid unwanted calls on initial load
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&countrycodes=ve`,
                        {
                            headers: {
                                "Accept-Language": "es" // Prefer Spanish results
                            }
                        }
                    );
                    const data = await response.json();
                    setSuggestions(data);
                } catch (error) {
                    console.error("Error fetching address suggestions:", error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            } else if (query.length <= 2) {
                setSuggestions([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue); // Update parent immediately as user types
        setIsOpen(true);
    };

    const handleSelect = (address: Address) => {
        setQuery(address.display_name);
        onChange(address.display_name);
        if (onSelectFull) onSelectFull(address);
        setSuggestions([]);
        setIsOpen(false);
    };

    const handleClear = () => {
        setQuery("");
        onChange("");
        setSuggestions([]);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isLoading && <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />}
                    {!isLoading && query && (
                        <button
                            onClick={handleClear}
                            type="button"
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        <ul className="py-1">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-start gap-3 border-b border-gray-50 last:border-0 group transition-colors"
                                >
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1 group-hover:text-purple-500" />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-snug">
                                        {item.display_name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="px-3 py-1 bg-gray-50 text-[10px] text-gray-400 text-right">
                            Powered by OpenStreetMap
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
