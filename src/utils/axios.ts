import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (email: string): AxiosInstance => {
    /**
     * Create Axios Instance
     */
    const axiosInstance = axios.create({
        baseURL: `${process.env.API_URL}`,
        headers: {
            authorization: email,
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        /* ----------------------------- API Call Start ----------------------------- */
        /* eslint-disable no-console */
        console.log('[===== Started API Call =====]');
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        /* ------------------------------ API Call End ------------------------------ */
        console.log('[===== Ended API Call =====]');
        return response;
    });

    return axiosInstance;
};

export default createAxiosInstance;
