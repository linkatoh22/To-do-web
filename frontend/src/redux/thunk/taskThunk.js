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

export const fetchTaskSort = createAsyncThunk(
    "group/fetchTaskSort",
    async(payload,{rejectWithValue })=>{
        try{
            
            const response = await TaskApi.fetchTaskSort(payload);
            
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchTaskGroupSort = createAsyncThunk(
    "group/fetchTaskGroupSort",
    async(payload,{rejectWithValue })=>{
        try{
            
            const response = await TaskApi.fetchTaskGroupSort(payload);
            
            return response.data
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)


export const fetchUpdateTask = createAsyncThunk(
    "group/fetchUpdateTask",
    async(payload,{rejectWithValue })=>{
        try{
            
            const response = await TaskApi.fetchUpdateTask(payload);
            
            return response.data;
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchDeleteTask = createAsyncThunk(
    "group/fetchDeleteTask",
    async(payload,{rejectWithValue })=>{
        try{
            
            const response = await TaskApi.fetchDeleteTask(payload);
           
            return response.data;
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)

export const fetchCreateTask = createAsyncThunk(
    "group/fetchCreateTask",
    async(payload,{rejectWithValue })=>{
        try{
            
            const response = await TaskApi.fetchCreateTask(payload);
           
            return response.data;
        }
        catch(error){
            return rejectWithValue (error.response?.data || error.message);
        }
    }

)



