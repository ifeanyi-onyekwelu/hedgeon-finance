'use client'

import axios, { AxiosInstance, AxiosResponse } from "axios";

// const baseURL = "http://localhost:3500/api/v1/";
const baseURL = "https://hedgeon-finance-1.onrender.com/api/v1/";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request intercetor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return {
            ...response,
            data: response.data,
            status: response.status,
        };
    },
);

export default axiosInstance;