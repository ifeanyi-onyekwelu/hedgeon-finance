import axiosInstance from "./axiosInstance";

export const withdrawApi = () => {
    return axiosInstance.post('/withdrawals/')
}
export const investApi = (investData: { planId: string, amount: number, currency: string }) => {
    return axiosInstance.post('/invest', investData)
}
export const getProfileApi = () => {
    return axiosInstance.get('/user/profile')
}
export const getReferralsApi = () => {
    return axiosInstance.get('/user/referrals')
}
export const updateProfileApi = () => {
    return axiosInstance.put('/user/update')
}
export const deleteAccountApi = () => {
    return axiosInstance.post('/user/delete')
}
export const uploadProfilePictureApi = () => {
    return axiosInstance.get('/user/upload')
}