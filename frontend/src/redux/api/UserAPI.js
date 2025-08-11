import axiosClient from "../interceptor/axiosClient";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UserApi ={
    fetchEditProfile :({payload}) =>  
        axiosClient.put(`${BASE_URL}/user/edit-profile`,payload,{  
            useAuth:true,
            headers: { "Content-Type": "multipart/form-data" }  
        }),
    fetchViewProfile :() =>  
        axiosClient.get(`${BASE_URL}/user/get-profile`,{  useAuth:true }),
    fetchChangePassword : (data) =>  
    axiosClient.put(`${BASE_URL}/user/change-password`, data, { useAuth: true }),
}