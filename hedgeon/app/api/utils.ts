import axiosInstance from "./axiosInstance";

export const getAllCurrencies = (selectedCurrency: string) => {
    return axiosInstance.get(`/currencies?name=${selectedCurrency}`)
}