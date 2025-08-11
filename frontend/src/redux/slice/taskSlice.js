import {createSlice} from "@reduxjs/toolkit"
import { fetchAllTask,fetchDetailTask,fetchTaskGroupSort,fetchTaskSort,fetchUpdateTask,fetchDeleteTask,fetchCreateTask,fetchTaskSortKeyword } from "../thunk/taskThunk"

const initialState = {
    loading:false,
    AllTask:[],
    TaskDetail:null,
    TaskSort:[],
    TaskGroup:[],
    status:null
}


const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
               
            })
            .addCase(fetchAllTask.fulfilled, (state, action) => {
                state.loading = false;
                state.AllTask = action.payload.data;
                state.error = null;
            })
            .addCase(fetchAllTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Gửi token thất bại";
            })



            .addCase(fetchDetailTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchDetailTask.fulfilled, (state, action) => {
                state.loading = false;
                state.TaskDetail = action.payload.data;
                state.error = null;
            })
            .addCase(fetchDetailTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })


            .addCase(fetchTaskSort.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchTaskSort.fulfilled, (state, action) => {
                state.loading = false;
                state.TaskSort = action.payload.data;
                state.error = null;
            })
            .addCase(fetchTaskSort.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })
            
            .addCase(fetchTaskGroupSort.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchTaskGroupSort.fulfilled, (state, action) => {
                state.loading = false;
                state.TaskGroup = action.payload.data;
                state.error = null;
            })
            .addCase(fetchTaskGroupSort.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })


            .addCase(fetchUpdateTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpdateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload;
                state.error = null;
            })
            .addCase(fetchUpdateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Update task thất bại";
            })


            .addCase(fetchDeleteTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeleteTask.fulfilled, (state, action) => {
                state.loading = false;
                
                state.error = null;
            })
            .addCase(fetchDeleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Update task thất bại";
            })


            .addCase(fetchCreateTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCreateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Update task thất bại";
            })


            .addCase(fetchTaskSortKeyword.pending,(state)=>{
                state.loading = true;
                state.error = null;
                
            })
            .addCase(fetchTaskSortKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.TaskSort = action.payload.data;
                state.error = null;
            })
            .addCase(fetchTaskSortKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })

    }
})


export default taskSlice.reducer;