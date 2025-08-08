import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskApi } from "../api/TaskAPI";

export const fetchAllTask = createAsyncThunk(
    "group/fetchAllTask",
    async(_,{rejectWithValue })=>{
        try{
            const response = await TaskApi.fetchAllTask();
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)


export const fetchDetailTask = createAsyncThunk(
    "group/fetchDetailTask",
    async(payload,{rejectWithValue })=>{
        try{
            const response = await TaskApi.fetchDetailTask(payload);
            
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

