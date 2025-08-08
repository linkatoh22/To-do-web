import {createSlice} from "@reduxjs/toolkit"
import { fetchAllTask,fetchDetailTask } from "../thunk/taskThunk"

const initialState = {
    loading:false,
    AllTask:[],
    TaskDetail:null
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
            

    }
})


export default taskSlice.reducer;