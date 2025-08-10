import axiosClient from "../interceptor/axiosClient";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const TaskApi ={
    fetchAllTask :() =>  
        axiosClient.get(`${BASE_URL}/group/get-group`,{  useAuth:true }),

    fetchCreateTask  :({payload}) =>  
        axiosClient.post(
            `${BASE_URL}/task/create-task`,payload,
            {  
                useAuth:true,
                headers: {
                "Content-Type": "multipart/form-data"
                } 
            }
        ),
    fetchDetailTask  :({taskId}) =>  
        axiosClient.get(`${BASE_URL}/task/get-task-detail/${taskId}`,{  useAuth:true }),

    fetchDeleteTask  :({taskId}) =>  
        axiosClient.delete(`${BASE_URL}/task/delete-task/${taskId}`,{  useAuth:true }),

    fetchUpdateTask  :({taskId,payload}) =>  
    axiosClient.put(`${BASE_URL}/task/update-task/${taskId}`, payload, {
        useAuth: true,
         headers: {
          "Content-Type": "multipart/form-data"
        }
    }),
    fetchTaskSort : ({sortBy,status})=>
        axiosClient.get(`${BASE_URL}/task/get-all-task-of-user`,{
            useAuth:true,
            params: {
                sortBy,
                status
            }
        }),
    fetchTaskGroupSort : ({sortBy,status,groupId})=>
    axiosClient.get(`${BASE_URL}/task/get-all-task-of-group`,{
        useAuth:true,
        params: {
            sortBy,
            status,
            groupId
        }
    })
    
}