"use client";

import { useState, useEffect } from "react";
import { Save, UserPlus } from "lucide-react";
import AddressAutocomplete from "./AddressAutocomplete";
import { CreatePacienteInterface } from "@/types/create-paciente.interface";
import { CreatePersonaInterface } from "@/types/create-persona.Interface";
import { handleAxiosError } from "@/lib/handleAxiosError";
import axiosClientInstance from "@/lib/AxiosClientInstance";
import { useNotificationStore } from "@/app/store/useNotificationStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



interface PatientFormProps {
    onSubmit: (data: CreatePacienteInterface) => void;
    onCancel: () => void;
    initialData: CreatePersonaInterface;
}

export default function PatientForm({ onSubmit, onCancel, initialData }: PatientFormProps) {
    const isNewPatient = !initialData?.cedula;
    const queryClient = useQueryClient();
    const { addNotification } = useNotificationStore();

    const [patientData, setPatientData] = useState<CreatePacienteInterface>({
        cedula: initialData?.cedula || "",
        tipo_cedula: initialData?.tipo_cedula || "",
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
        nHabitaciones: 0,
        nBanos: 0,
        cocina: false,
        salaComedor: false,
        tenenciaVivienda: "",
        observaciones: ""
    });

    const HOUSING_OPTIONS = ["QUINTA", "APTO", "CASA", "RANCHO"];
    const TENENCIA_OPTIONS = ["PROPIA", "ALQUILADA", "CEDIDA", "PRESTADA"];

    const [isCustomHousing, setIsCustomHousing] = useState(false);
    const [isCustomTenencia, setIsCustomTenencia] = useState(false);

    const { data: fetchedData, isLoading: isLoadingPatient } = useQuery({
        queryKey: ['patient', initialData?.cedula, initialData?.tipo_cedula],
        queryFn: async () => {
            const response = await axiosClientInstance.get(`/paciente/${initialData.cedula}/${initialData.tipo_cedula}`);
            return response.data;
        },
        enabled: !isNewPatient, // Only fetch if we're editing an existing patient
    });

    useEffect(() => {
        if (fetchedData) {
            const personaData = fetchedData.persona || fetchedData; // fallback if persona object isn't nested but flat
            setPatientData(prev => ({
                ...prev,
                cedula: personaData?.cedula || prev.cedula,
                tipo_cedula: personaData?.tipo_cedula || prev.tipo_cedula,
                estadoCivil: fetchedData.estadoCivil || "",
                lugarNacimiento: fetchedData.lugarNacimiento || "",
                paisNacimiento: fetchedData.paisNacimiento || "",
                ocupacion: fetchedData.ocupacion || "",
                gradoInstruccion: fetchedData.gradoInstruccion || "",
                profesion: fetchedData.profesion || "",
                salarioMensual: fetchedData.salarioMensual || "",
                carnetPatria: fetchedData.carnetPatria || false,
                tipoDeSolicitud: fetchedData.tipoDeSolicitud || "",
                alergico: fetchedData.alergico || "",
                tipoVivienda: fetchedData.tipoVivienda || "",
                descripcionVivienda: fetchedData.descripcionVivienda || "",
                nHabitaciones: fetchedData.nHabitaciones || 0,
                nBanos: fetchedData.nBanos || 0,
                cocina: fetchedData.cocina || false,
                salaComedor: fetchedData.salaComedor || false,
                tenenciaVivienda: fetchedData.tenenciaVivienda || "",
                observaciones: fetchedData.observaciones || ""
            }));
            
            if (!HOUSING_OPTIONS.includes(fetchedData.tipoVivienda) && fetchedData.tipoVivienda) {
                 setIsCustomHousing(true);
            }
            if (!TENENCIA_OPTIONS.includes(fetchedData.tenenciaVivienda) && fetchedData.tenenciaVivienda) {
                 setIsCustomTenencia(true);
            }
        }
    }, [fetchedData, setIsCustomHousing, setIsCustomTenencia]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setPatientData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    // Removed duplicate HOUSING_OPTIONS and TENENCIA_OPTIONS declarations here.
    // Removed duplicate isCustomHousing and isCustomTenencia state declarations here.

    const handleHousingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "OTRO") {
            setIsCustomHousing(true);
            setPatientData(prev => ({ ...prev, tipoVivienda: "" }));
        } else {
            setIsCustomHousing(false);
            setPatientData(prev => ({ ...prev, tipoVivienda: value }));
        }
    };

    const handleTenenciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "OTRO") {
            setIsCustomTenencia(true);
            setPatientData(prev => ({ ...prev, tenenciaVivienda: "" }));
        } else {
            setIsCustomTenencia(false);
            setPatientData(prev => ({ ...prev, tenenciaVivienda: value }));
        }
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPatientData(prev => ({ ...prev, [name]: checked }));
    };

    const mutation = useMutation({
        mutationFn: async (submissionData: any) => {
            if (isNewPatient) {
                return await axiosClientInstance.post("/paciente", submissionData);
            } else {
                return await axiosClientInstance.patch(`/paciente/${initialData?.cedula}/${initialData?.tipo_cedula}`, submissionData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            queryClient.invalidateQueries({ queryKey: ["patient", patientData.cedula, patientData.tipo_cedula] });
            
            addNotification("success", isNewPatient ? "Paciente registrado exitosamente" : "Información actualizada correctamente");
            onSubmit(patientData);
            onCancel();
        },
        onError: (error) => {
            const errorMessage = handleAxiosError(error);
            addNotification("error", errorMessage);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const submissionData = Object.fromEntries(
            Object.entries(patientData).map(([key, value]) => {
                if (value === "") return [key, null];
                return [key, value];
            })
        );
        mutation.mutate(submissionData);
    };

    if (isLoadingPatient) {
        return <div className="p-8 text-center text-gray-500">Cargando datos del paciente...</div>;
    }
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

                <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-700">Lugar y País de Nacimiento</label>
                    <div className="relative">
                        <AddressAutocomplete
                            value={patientData.lugarNacimiento}
                            onChange={(val) => setPatientData(prev => ({ ...prev, lugarNacimiento: val }))}
                            onSelectFull={(address) => {
                                const country = address.address?.country || "";
                                setPatientData(prev => ({
                                    ...prev,
                                    lugarNacimiento: address.display_name,
                                    paisNacimiento: country
                                }));
                            }}
                            placeholder="Buscar ciudad de nacimiento..."
                        />
                    </div>
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

            <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Tipo de Vivienda</label>
                        <div className="space-y-2">
                            <select
                                value={isCustomHousing ? "OTRO" : (HOUSING_OPTIONS.includes(patientData.tipoVivienda) ? patientData.tipoVivienda : "")}
                                onChange={handleHousingChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
                            >
                                <option value="">Seleccionar</option>
                                {HOUSING_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                                <option value="OTRO">OTRO</option>
                            </select>

                            {isCustomHousing && (
                                <input
                                    type="text"
                                    name="tipoVivienda"
                                    value={patientData.tipoVivienda}
                                    onChange={handleChange}
                                    placeholder="Especifique otro tipo de vivienda"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none animate-fadeIn"
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Tenencia</label>
                        <div className="space-y-2">
                            <select
                                value={isCustomTenencia ? "OTRO" : (TENENCIA_OPTIONS.includes(patientData.tenenciaVivienda) ? patientData.tenenciaVivienda : "")}
                                onChange={handleTenenciaChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
                            >
                                <option value="">Seleccionar</option>
                                {TENENCIA_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                                <option value="OTRO">OTRO</option>
                            </select>

                            {isCustomTenencia && (
                                <input
                                    type="text"
                                    name="tenenciaVivienda"
                                    value={patientData.tenenciaVivienda}
                                    onChange={handleChange}
                                    placeholder="Especifique tenencia"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none animate-fadeIn"
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-medium text-gray-700">Descripción Vivienda</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">N° de Hab.</label>
                            <input
                                type="number"
                                min="0"
                                name="nHabitaciones"
                                value={patientData.nHabitaciones}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">N° de Baños</label>
                            <input
                                type="number"
                                min="0"
                                name="nBanos"
                                value={patientData.nBanos}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-wrap gap-4 items-center pl-2">
                            <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                <input
                                    type="checkbox"
                                    name="cocina"
                                    checked={patientData.cocina}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">Cocina</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                <input
                                    type="checkbox"
                                    name="salaComedor"
                                    checked={patientData.salaComedor}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">Sala/Comed</span>
                            </label>
                        </div>

                        <div className="col-span-2 md:col-span-4 mt-2">
                            <input
                                type="text"
                                name="descripcionVivienda"
                                placeholder="Otro: (Especifique detalles adicionales)"
                                value={patientData.descripcionVivienda}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-900 outline-none focus:border-purple-500 bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Núcleo Familiar</h3>
                    <button
                        type="button"
                        onClick={() => console.log("Agregar familiar clicked")}
                        className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors"
                    >
                        <UserPlus className="w-3.5 h-3.5" />
                        Agregar Familiar
                    </button>
                </div>
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-50/50">
                    <UserPlus className="w-8 h-8 opacity-20" />
                    <span className="text-sm">No hay familiares registrados</span>
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
            {mutation.isError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {handleAxiosError(mutation.error)}
                </div>
            )}
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
                    disabled={mutation.isPending}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {isNewPatient ? "Crear Paciente" : "Actualizar Paciente"}
                </button>
            </div>
        </form>
    );
}
