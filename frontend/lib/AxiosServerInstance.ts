import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClientInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClientInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.user?.backendAccessToken) {
        config.headers.Authorization = `Bearer ${session.user.backendAccessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClientInstance;