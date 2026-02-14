"use client";

import { useState } from "react";
import { Save, FileText, Stethoscope, Clipboard, Activity } from "lucide-react";
import PathologySelector from "./PathologySelector";

interface ConsultationFormProps {
    patientName: string;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export default function ConsultationForm({ patientName, onSubmit, onCancel }: ConsultationFormProps) {
    const [formData, setFormData] = useState({
        motivoConsulta: "",
        sintomas: "",
        diagnostico: "",
        tratamiento: "",
        observaciones: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-5 space-y-4 shadow-sm animate-fadeIn">
            <div className="pb-3 border-b border-gray-50 mb-2 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-800">Nueva Consulta Médica</h3>
                    <p className="text-xs text-purple-600 font-medium">Paciente: {patientName}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Motivo de Consulta</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                            name="motivoConsulta"
                            value={formData.motivoConsulta}
                            onChange={handleChange}
                            rows={2}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                            placeholder="Breve descripción del motivo..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Síntomas</label>
                    <div className="relative">
                        <Activity className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                            name="sintomas"
                            value={formData.sintomas}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                            placeholder="Descripción detallada de síntomas..."
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Diagnóstico Presuntivo</label>
                        <label className="text-xs font-medium text-gray-700">Diagnóstico Presuntivo</label>
                        <PathologySelector
                            value={formData.diagnostico}
                            onChange={(val) => setFormData(prev => ({ ...prev, diagnostico: val }))}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Tratamiento / Plan</label>
                        <textarea
                            name="tratamiento"
                            value={formData.tratamiento}
                            onChange={handleChange}
                            rows={1}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                            placeholder="Indicaciones generales..."
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Observaciones Adicionales</label>
                    <div className="relative">
                        <Clipboard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                            rows={2}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-4">
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
                    Guardar Consulta
                </button>
            </div>
        </form>
    );
}
