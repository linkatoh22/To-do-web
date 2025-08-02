import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const forgetPasswordApi = {
    sendPassLinkEmail: (data) =>
        axios.post(`${BASE_URL}/auth/forget-password/send-link`, data),
    changePasswordWithToken : ({token,password}) =>
        axios.put(`${BASE_URL}/auth/forget-password/change-password/${token}`, {password:password}),
    verifyLink:({token})=>
        axios.get(`${BASE_URL}/auth/forget-password/verify-link/${token}`)
};

