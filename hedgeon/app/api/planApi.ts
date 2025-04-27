import axiosInstance from "./axiosInstance";

export const getPlansApi = () => {
    return axiosInstance.get("/plans")
}

export const getPlanDetailsApi = (planId: string) => {
    return axiosInstance.get(`/plans/${planId}`)
}