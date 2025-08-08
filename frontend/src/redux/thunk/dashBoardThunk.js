import { createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardApi } from "../api/DashboardAPI";

export const fetchAllTask = createAsyncThunk(
    "dashBoard/fetchAllTask",
    async(_,{rejectWithValue })=>{
        try{

            const response = await DashboardApi.fetchAllTask();
            console.log("DATA NE: ",response.data)
            return response.data;

        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


export const fetchNearestDeadlineTask = createAsyncThunk(
    "dashBoard/fetchNearestDeadlineTask",
    async(_,{rejectWithValue })=>{
        try{

            const response = await DashboardApi.fetchNearestDeadlineTask();
            return response.data
            
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


export const fetchNearestCompleteTask = createAsyncThunk(
    "dashBoard/fetchNearestCompleteTask",
    async(_,{rejectWithValue })=>{
        try{

            const response = await DashboardApi.fetchNearestCompleteTask();
            return response.data
            
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchCreateTask = createAsyncThunk(
    "dashBoard/fetchCreateTask",
    async({data},{rejectWithValue })=>{
        try{

            const response = await DashboardApi.fetchCreateTask(data);
            return response.data
            
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)