import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AuthApi = {
    
    fetchSignUp: (data) =>
        axios.post(`${BASE_URL}/auth/sign-up`, data),
    fetchLogIn : (data) =>
        axios.post(`${BASE_URL}/auth/log-in`, data,{ withCredentials: true }),
    fetchLogOut : () =>
        axios.get(`${BASE_URL}/auth/log-out`,{ withCredentials: true }),
    fetchVerifyOTP : (data) =>
        axios.post(`${BASE_URL}/auth/verify-otp`,data),
    fetchResendOTP : (data) =>
        axios.post(`${BASE_URL}/auth/resend-otp`,data),
  
};

