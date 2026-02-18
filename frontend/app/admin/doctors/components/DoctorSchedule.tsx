"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Check, Plus, Trash2, CalendarDays, Repeat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ScheduleType = 'weekly' | 'biweekly' | 'monthly' | 'specific';

export interface ScheduleData {
    type: ScheduleType;
    weekly?: WeeklySchedule[];
    biweekly?: { week1: WeeklySchedule[], week2: WeeklySchedule[] };
    monthly?: MonthlySchedule;
    specific?: SpecificDateSchedule[];
}

export interface WeeklySchedule {
    day: string;
    dayIndex: number; // 0=Sunday, 1=Monday...
    isActive: boolean;
    startTime: string;
    endTime: string;
}

export interface MonthlyDaySchedule {
    day: number;
    startTime: string;
    endTime: string;
}

export interface MonthlySchedule {
    days: MonthlyDaySchedule[];
}

export interface SpecificDateSchedule {
    id: string;
    date: string; // YYYY-MM-DD
    startTime: string;
    endTime: string;
}

interface DoctorScheduleProps {
    value: ScheduleData;
    onChange: (data: ScheduleData) => void;
}

const DAYS_OF_WEEK = [
    { name: "Lunes", index: 1 },
    { name: "Martes", index: 2 },
    { name: "Miércoles", index: 3 },
    { name: "Jueves", index: 4 },
    { name: "Viernes", index: 5 },
    { name: "Sábado", index: 6 },
    { name: "Domingo", index: 0 },
];

export const DEFAULT_WEEKLY: WeeklySchedule[] = DAYS_OF_WEEK.map(d => ({
    day: d.name,
    dayIndex: d.index,
    isActive: false,
    startTime: "08:00",
    endTime: "17:00"
}));

export default function DoctorSchedule({ value, onChange }: DoctorScheduleProps) {
    const [activeTab, setActiveTab] = useState<ScheduleType>(value.type || 'weekly');
    const [biweeklyTab, setBiweeklyTab] = useState<'week1' | 'week2'>('week1');

    useEffect(() => {
        // Evaluate if we need to initialize defaults
        let newData = { ...value };
        let hasChanges = false;

        if (!newData.type) {
            newData.type = 'weekly';
            hasChanges = true;
        }

        if (newData.type === 'weekly' && !newData.weekly) {
            newData.weekly = JSON.parse(JSON.stringify(DEFAULT_WEEKLY));
            hasChanges = true;
        }

        if (newData.type === 'biweekly' && !newData.biweekly) {
            newData.biweekly = {
                week1: JSON.parse(JSON.stringify(DEFAULT_WEEKLY)),
                week2: JSON.parse(JSON.stringify(DEFAULT_WEEKLY))
            };
            hasChanges = true;
        }

        if (newData.type === 'monthly' && !newData.monthly) {
            newData.monthly = { days: [] };
            hasChanges = true;
        }

        if (newData.type === 'specific' && !newData.specific) {
            newData.specific = [];
            hasChanges = true;
        }

        if (hasChanges) {
            onChange(newData);
        }
    }, []);

    const handleTypeChange = (type: ScheduleType) => {
        setActiveTab(type);

        let overrides: any = { type };

        if (type === 'weekly' && !value.weekly) {
            overrides.weekly = JSON.parse(JSON.stringify(DEFAULT_WEEKLY));
        }
        if (type === 'biweekly' && !value.biweekly) {
            overrides.biweekly = {
                week1: JSON.parse(JSON.stringify(DEFAULT_WEEKLY)),
                week2: JSON.parse(JSON.stringify(DEFAULT_WEEKLY))
            };
        }
        if (type === 'monthly' && !value.monthly) {
            overrides.monthly = { days: [] };
        }
        if (type === 'specific' && !value.specific) {
            overrides.specific = [];
        }

        onChange({ ...value, ...overrides });
    };

    // --- Weekly Helpers ---
    const updateWeeklyDay = (index: number, field: keyof WeeklySchedule, val: any, weekKey?: 'week1' | 'week2') => {
        if (weekKey && value.biweekly) {
            const newWeek = [...value.biweekly[weekKey]];
            newWeek[index] = { ...newWeek[index], [field]: val };
            onChange({
                ...value,
                biweekly: { ...value.biweekly, [weekKey]: newWeek }
            });
        } else if (value.weekly) {
            const newWeekly = [...value.weekly];
            newWeekly[index] = { ...newWeekly[index], [field]: val };
            onChange({ ...value, weekly: newWeekly });
        }
    };

    // --- Monthly Helpers ---
    const toggleMonthDay = (day: number) => {
        if (!value.monthly) return;
        const currentDays = value.monthly.days || [];
        const exists = currentDays.find(d => d.day === day);

        let newDays;
        if (exists) {
            newDays = currentDays.filter(d => d.day !== day);
        } else {
            newDays = [...currentDays, { day, startTime: "08:00", endTime: "17:00" }].sort((a, b) => a.day - b.day);
        }

        onChange({
            ...value,
            monthly: { ...value.monthly, days: newDays }
        });
    };

    const updateMonthlyDayTime = (day: number, field: 'startTime' | 'endTime', val: string) => {
        if (!value.monthly) return;
        const newDays = value.monthly.days.map(d => d.day === day ? { ...d, [field]: val } : d);
        onChange({
            ...value,
            monthly: { ...value.monthly, days: newDays }
        });
    };

    // --- Specific Helpers ---
    const addSpecificDate = () => {
        const newDate: SpecificDateSchedule = {
            id: Date.now().toString(),
            date: "",
            startTime: "08:00",
            endTime: "17:00"
        };
        onChange({
            ...value,
            specific: [...(value.specific || []), newDate]
        });
    };

    const removeSpecificDate = (id: string) => {
        onChange({
            ...value,
            specific: (value.specific || []).filter(s => s.id !== id)
        });
    };

    const updateSpecificDate = (id: string, field: keyof SpecificDateSchedule, val: string) => {
        onChange({
            ...value,
            specific: (value.specific || []).map(s => s.id === id ? { ...s, [field]: val } : s)
        });
    };

    // --- Renderers ---
    const renderWeeklyView = (schedule: WeeklySchedule[], weekKey?: 'week1' | 'week2') => (
        <div className="space-y-3 animate-fadeIn">
            <div className="grid gap-3">
                {schedule?.map((day, idx) => (
                    <div key={day.day} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${day.isActive ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-3 flex-1">
                            <input
                                type="checkbox"
                                checked={day.isActive}
                                onChange={(e) => updateWeeklyDay(idx, 'isActive', e.target.checked, weekKey)}
                                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                            />
                            <span className={`font-medium ${day.isActive ? 'text-purple-700' : 'text-gray-500'}`}>{day.day}</span>
                        </div>

                        {day.isActive && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <input
                                        type="time"
                                        value={day.startTime}
                                        onChange={(e) => updateWeeklyDay(idx, 'startTime', e.target.value, weekKey)}
                                        className="text-sm text-gray-700 outline-none w-20 bg-transparent"
                                    />
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <input
                                        type="time"
                                        value={day.endTime}
                                        onChange={(e) => updateWeeklyDay(idx, 'endTime', e.target.value, weekKey)}
                                        className="text-sm text-gray-700 outline-none w-20 bg-transparent"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl">
                {[
                    { id: 'weekly', label: 'Semanal', icon: Repeat },
                    { id: 'biweekly', label: 'Quincenal (15 días)', icon: CalendarDays },
                    { id: 'monthly', label: 'Mensual', icon: Calendar },
                    { id: 'specific', label: 'Fechas Puntuales', icon: Check }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTypeChange(tab.id as ScheduleType)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-white text-purple-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'weekly' && (
                        <motion.div
                            key="weekly"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {renderWeeklyView(value.weekly || [])}
                        </motion.div>
                    )}

                    {activeTab === 'biweekly' && (
                        <motion.div
                            key="biweekly"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="inline-flex p-1 bg-white border border-gray-200 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setBiweeklyTab('week1')}
                                        className={`px-6 py-1.5 text-sm font-medium rounded-md transition-all ${biweeklyTab === 'week1' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Semana 1
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBiweeklyTab('week2')}
                                        className={`px-6 py-1.5 text-sm font-medium rounded-md transition-all ${biweeklyTab === 'week2' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Semana 2
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-center text-gray-500 mb-4">
                                Configurando la <strong>{biweeklyTab === 'week1' ? 'Primera Semana' : 'Segunda Semana'}</strong> del ciclo.
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={biweeklyTab}
                                    initial={{ opacity: 0, x: biweeklyTab === 'week1' ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: biweeklyTab === 'week1' ? 20 : -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderWeeklyView(value.biweekly?.[biweeklyTab] || [], biweeklyTab)}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {activeTab === 'monthly' && (
                        <motion.div
                            key="monthly"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Selecciona los días del mes:</label>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                        const isSelected = value.monthly?.days.some(d => d.day === day);
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => toggleMonthDay(day)}
                                                className={`h-10 rounded-lg text-sm font-medium border transition-all ${isSelected
                                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:shadow-sm'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Selected Days List */}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Horarios por día seleccionado:</label>
                                {value.monthly?.days.length === 0 && (
                                    <p className="text-sm text-gray-400 italic text-center py-4">Ningún día seleccionado.</p>
                                )}
                                <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                    {value.monthly?.days.map((daySchedule) => (
                                        <div key={daySchedule.day} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm shrink-0">
                                                {daySchedule.day}
                                            </div>
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                                                    <span className="text-xs text-gray-500 mr-1">Entrada:</span>
                                                    <input
                                                        type="time"
                                                        value={daySchedule.startTime}
                                                        onChange={(e) => updateMonthlyDayTime(daySchedule.day, 'startTime', e.target.value)}
                                                        className="text-sm text-gray-900 outline-none bg-transparent w-full"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                                                    <span className="text-xs text-gray-500 mr-1">Salida:</span>
                                                    <input
                                                        type="time"
                                                        value={daySchedule.endTime}
                                                        onChange={(e) => updateMonthlyDayTime(daySchedule.day, 'endTime', e.target.value)}
                                                        className="text-sm text-gray-900 outline-none bg-transparent w-full"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleMonthDay(daySchedule.day)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'specific' && (
                        <motion.div
                            key="specific"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">Agrega fechas específicas donde el doctor asistirá.</p>
                                <button
                                    type="button"
                                    onClick={addSpecificDate}
                                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" />
                                    Agregar Fecha
                                </button>
                            </div>

                            <div className="space-y-3">
                                {value.specific?.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 italic">No hay fechas configuradas.</div>
                                )}
                                {value.specific?.map((item) => (
                                    <div key={item.id} className="flex flex-wrap items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn">
                                        <div className="flex-1 min-w-[150px]">
                                            <input
                                                type="date"
                                                value={item.date}
                                                onChange={(e) => updateSpecificDate(item.id, 'date', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="time"
                                                value={item.startTime}
                                                onChange={(e) => updateSpecificDate(item.id, 'startTime', e.target.value)}
                                                className="px-2 py-2 border border-gray-200 rounded-lg text-gray-900 text-sm w-24"
                                            />
                                            <span className="text-gray-300">-</span>
                                            <input
                                                type="time"
                                                value={item.endTime}
                                                onChange={(e) => updateSpecificDate(item.id, 'endTime', e.target.value)}
                                                className="px-2 py-2 border border-gray-200 rounded-lg text-gray-900 text-sm w-24"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSpecificDate(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
