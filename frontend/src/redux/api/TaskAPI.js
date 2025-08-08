import axiosClient from "../interceptor/axiosClient";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const TaskApi ={
    fetchAllTask :() =>  
        axiosClient.get(`${BASE_URL}/group/get-group`,{  useAuth:true }),
    fetchDetailTask  :({taskId}) =>  
        axiosClient.get(`${BASE_URL}/task/get-task-detail/${taskId}`,{  useAuth:true }),
    
}