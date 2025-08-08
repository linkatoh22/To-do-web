import {createSlice} from "@reduxjs/toolkit"
import { fetchAllTask, fetchNearestDeadlineTask, fetchNearestCompleteTask,fetchCreateTask } from "../thunk/dashBoardThunk"

const initialState = {
    loading:false,
    loading:false,
    AllTask:[],
    AllDeadlineTask:[],
    AllCompleteTask:[],
}


const dashBoardSlice = createSlice({
    name:"dashBoard",
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
            
           
            .addCase(fetchAllTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
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



            .addCase(fetchNearestDeadlineTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchNearestDeadlineTask.fulfilled, (state, action) => {
                state.loading = false;
                state.AllDeadlineTask = action.payload.data;
                state.error = null;
            })
            .addCase(fetchNearestDeadlineTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task gần deadline thất bại";
            })


            .addCase(fetchNearestCompleteTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchNearestCompleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.AllCompleteTask = action.payload.data;
                state.error = null;
            })
            .addCase(fetchNearestCompleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lấy Task hoàn thành gần nhất  thất bại";
            })

            .addCase(fetchCreateTask.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.signUpSuccess = false;
            })
            .addCase(fetchCreateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCreateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo task thât bại";
            })

            

    }
})


export default dashBoardSlice.reducer;