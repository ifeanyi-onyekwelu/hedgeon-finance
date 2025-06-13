'use client'

import axios, { AxiosInstance, AxiosResponse } from "axios";
//
// const baseURL = "http://localhost:3500/api/v1/";
const baseURL = "https://api.hedgeonfinance.com/api/v1/";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 100000,
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
    }, (error) => {
        console.log("Error in response interceptor", error);

        if (error?.response?.status === 401) {
            const message = error.response.data?.message || '';

            // Check for common JWT issues
            const jwtErrors = [
                "jwt expired",
                "jwt malformed",
                "invalid token",
                "invalid signature",
                "TokenExpiredError",
                "JsonWebTokenError",
                "Unauthorized"
            ];

            const isJwtError = jwtErrors.some(err => message.toLowerCase().includes(err.toLowerCase()));
            if (isJwtError) {
                localStorage.removeItem("access_token");
                window.location.href = "/logged-out"; // or your login page: "/login"
                return;
            }
        }

        return Promise.reject(error);

    }
);

export default axiosInstance;