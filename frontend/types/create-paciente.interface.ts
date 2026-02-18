export interface CreatePacienteInterface {
        cedula: string;
        tipo_cedula: string;
        estadoCivil: string;
        lugarNacimiento: string;
        paisNacimiento: string;
        ocupacion: string;
        gradoInstruccion: string;
        profesion: string;
        salarioMensual: string;
        carnetPatria: boolean;
        tipoDeSolicitud: string;
        alergico: string;
        tipoVivienda: string;
        descripcionVivienda: string;
        nHabitaciones: number;
        nBanos: number; 
        cocina: boolean;
        salaComedor: boolean;
        tenenciaVivienda: string;
        observaciones: string;
}
