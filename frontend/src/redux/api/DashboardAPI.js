import axiosClient from "../interceptor/axiosClient";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const DashboardApi ={
    fetchAllTask :() =>  
        axiosClient.get(`${BASE_URL}/task/get-task-user`,{  useAuth:true }),
    fetchNearestDeadlineTask :() =>
        axiosClient.get(`${BASE_URL}/task/get-nearest-deadline-tasks`,{  useAuth:true }),
    fetchNearestCompleteTask :() =>
        axiosClient.get(`${BASE_URL}/task/get-nearest-deadline-complete`,{  useAuth:true }),
    fetchCreateTask :({data}) =>
        axiosClient.get(`${BASE_URL}/task/create-task`,data,{  useAuth:true })
}