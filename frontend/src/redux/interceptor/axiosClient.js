import axios from "axios";
import { resetAccessToken } from "../api/HandleAccessTokenAPI";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials: true
})
axiosClient.interceptors.request.use((config)=>{
    if(config.useAuth){
        const token  = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config;
})
axiosClient.interceptors.response.use(
    (response)=>response,

    async(error)=>{
        
        
        const  originalRequest = error.config;

        if(
            originalRequest&&
            originalRequest.useAuth &&
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ){
            
            originalRequest._retry = true;
            await resetAccessToken();

            const newToken = localStorage.getItem("accessToken");

            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`

            return axios(originalRequest)
            



        }
        return Promise.reject(error);

    }


)


export default axiosClient