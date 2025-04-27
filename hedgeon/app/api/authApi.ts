import axiosInstance from "./axiosInstance";

export const loginApi = (credentials: { email: string, password: string }) => {
    return axiosInstance.post("/auth/login", credentials)
}

export const signupApi = (credentials: { email: string, password: string; role?: string }) => {
    return axiosInstance.post(`/auth/register?role=${credentials.role || "user"}`, credentials);
}

export const refreshApi = () => {
    return axiosInstance.get("/auth/refresh")
}

export const logoutApi = () => {
    return axiosInstance.post("/auth/logout")
}