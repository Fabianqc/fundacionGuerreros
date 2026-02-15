export const handleAxiosError = (error: any) => {
    if (error.response) {
        return error.response.data.message;
    } else if (error.request) {
        return "Error de conexión";
    } else {
        return "Error desconocido";
    }
};