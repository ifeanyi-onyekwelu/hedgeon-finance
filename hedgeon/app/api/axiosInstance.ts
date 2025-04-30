// utils/axiosInstance.ts
'use client'

import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// const baseURL = "http://localhost:3500/api/v1/";
const baseURL = "https://hedgeon-finance-1.onrender.com/api/v1/";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // Important for cookies
});

let isRefreshing = false;
let failedQueue: ((token: string | null) => void)[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error === null) {
            prom(token);
        } else {
            prom(null); // Indicate failure
        }
    });
    failedQueue = [];
};

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return {
            ...response,
            data: response.data,
            status: response.status,
        };
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshResponse = await axiosInstance.get('/auth/refresh'); // Your refresh endpoint

                    if (refreshResponse.status === 200 && refreshResponse.data?.accessToken) {
                        const newAccessToken = refreshResponse.data.accessToken;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        processQueue(null, newAccessToken);
                        return axiosInstance(originalRequest); // Retry the original request
                    } else {
                        // Refresh failed, signal redirection
                        processQueue(error, null);
                        return Promise.reject(new AxiosError('Refresh token failed, redirecting to login', undefined, originalRequest, error.response));
                    }
                } catch (refreshError: any) {
                    // Error during refresh, signal redirection
                    processQueue(refreshError, null);
                    return Promise.reject(new AxiosError('Error during token refresh, redirecting to login', undefined, originalRequest, refreshError.response));
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve) => {
                    failedQueue.push((token: string | null) => {
                        if (token) {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        } else {
                            resolve(Promise.reject(error));
                        }
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;