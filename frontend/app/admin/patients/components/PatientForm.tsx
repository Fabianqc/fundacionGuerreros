"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface PatientFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
    initialData?: any;
    submitLabel?: string;
}

export default function PatientForm({ onSubmit, onCancel, initialData, submitLabel = "Crear Paciente" }: PatientFormProps) {
    const [patientData, setPatientData] = useState({
        estadoCivil: "",
        lugarNacimiento: "",
        paisNacimiento: "",
        ocupacion: "",
        gradoInstruccion: "",
        profesion: "",
        salarioMensual: "",
        carnetPatria: false,
        tipoDeSolicitud: "",
        alergico: "",
        tipoVivienda: "",
        descripcionVivienda: "",
        tenenciaVivienda: "",
        observaciones: ""
    });

    useEffect(() => {
        if (initialData) {
            setPatientData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPatientData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(patientData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm animate-fadeIn">
            <div className="pb-3 border-b border-gray-50 mb-2">
                <h3 className="font-semibold text-gray-800">Datos Clínicos del Paciente</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Estado Civil</label>
                    <select
                        name="estadoCivil"
                        value={patientData.estadoCivil}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    >
                        <option value="">Seleccionar</option>
                        <option value="SOLTERO">Soltero</option>
                        <option value="CASADO">Casado</option>
                        <option value="DIVORCIADO">Divorciado</option>
                        <option value="VIUDO">Viudo</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Grado de Instrucción</label>
                    <select
                        name="gradoInstruccion"
                        value={patientData.gradoInstruccion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    >
                        <option value="">Seleccionar</option>
                        <option value="Sin instrucción">Sin instrucción</option>
                        <option value="Primaria Incompleta">Primaria Incompleta</option>
                        <option value="Primaria Completa">Primaria Completa</option>
                        <option value="Secundaria Incompleta">Secundaria Incompleta</option>
                        <option value="Secundaria Completa">Secundaria Completa</option>
                        <option value="Técnico Medio">Técnico Medio</option>
                        <option value="TSU">TSU</option>
                        <option value="Universitario Incompleto">Universitario Incompleto</option>
                        <option value="Universitario Completo">Universitario Completo</option>
                        <option value="Postgrado">Postgrado</option>
                        <option value="Doctorado">Doctorado</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Lugar de Nacimiento</label>
                    <input
                        type="text"
                        name="lugarNacimiento"
                        value={patientData.lugarNacimiento}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">País de Nacimiento</label>
                    <input
                        type="text"
                        name="paisNacimiento"
                        value={patientData.paisNacimiento}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Ocupación</label>
                    <input
                        type="text"
                        name="ocupacion"
                        value={patientData.ocupacion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Profesión</label>
                    <input
                        type="text"
                        name="profesion"
                        value={patientData.profesion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Salario Mensual</label>
                    <input
                        type="text"
                        name="salarioMensual"
                        value={patientData.salarioMensual}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>

                <div className="space-y-1 flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="carnetPatria"
                            checked={patientData.carnetPatria}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">¿Tiene Carnet de la Patria?</span>
                    </label>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Tipo de Solicitud</label>
                <textarea
                    name="tipoDeSolicitud"
                    value={patientData.tipoDeSolicitud}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Alérgico a</label>
                <input
                    type="text"
                    name="alergico"
                    value={patientData.alergico}
                    onChange={handleChange}
                    placeholder="N/A si no aplica"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Tipo de Vivienda</label>
                    <input
                        type="text"
                        name="tipoVivienda"
                        value={patientData.tipoVivienda}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Descripción Vivienda</label>
                    <input
                        type="text"
                        name="descripcionVivienda"
                        value={patientData.descripcionVivienda}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Tenencia</label>
                    <input
                        type="text"
                        name="tenenciaVivienda"
                        value={patientData.tenenciaVivienda}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Observaciones</label>
                <textarea
                    name="observaciones"
                    value={patientData.observaciones}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                />
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
