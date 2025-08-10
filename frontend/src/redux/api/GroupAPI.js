import axiosClient from "../interceptor/axiosClient";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const GroupApi ={
    fetchAllGroup :() =>  
        axiosClient.get(`${BASE_URL}/group/get-group`,{  useAuth:true }),
    fetchDetailGroup :({groupId}) =>  
        axiosClient.get(`${BASE_URL}/group/get-detail-group/${groupId}`,{  useAuth:true }),
    
    fetchUpdateGroup :({data,groupId}) =>
        axiosClient.put(`${BASE_URL}/group/update-group/${groupId}`,data,{  
            useAuth:true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        
        }),

    fetchCreateGroup :({data}) =>
        axiosClient.post(`${BASE_URL}/group/create-group`,data,{  
                useAuth:true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }  
        }),

    fetchDeleteGroup :({groupId}) =>
        axiosClient.delete(`${BASE_URL}/group/delete-group/${groupId}`,{  useAuth:true })
}