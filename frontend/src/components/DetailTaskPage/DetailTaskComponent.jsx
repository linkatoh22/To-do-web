import {TaskCard} from "../TaskCard";
import { Button, Grid, MenuItem,Box,Typography,IconButton } from "@mui/material";
import styled from "styled-components";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from "react-router-dom";
import { fetchDetailTask } from "../../redux/thunk/taskThunk";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import {UpdateDialog} from "../TaskDialog/UpdateDialog"
import { fetchDeleteTask } from "../../redux/thunk/taskThunk";
import { LoadingContainer } from "../loadingContainer";
const ImageGroup = styled.img`
    width:20%; 
    aspect-ratio: 1 / 1;
     object-fit: cover;
     border-radius: 10px;
`
export function DetailTaskContainer(){
    const {AllTask,TaskDetail,loading} = useSelector(s=>s.task)
    const {id}= useParams();
    const dispatch = useDispatch()
   

    const TaskDetailRender = useMemo(()=>{
        return TaskDetail
    },[TaskDetail])

    useEffect(()=>{
        const fetchDetailTaskRender = async()=>{
            await dispatch(fetchDetailTask({taskId:id}))
        }

        fetchDetailTaskRender();
    },[])

    const endDateStr = TaskDetail?.EndDate
        ? dayjs(TaskDetail.EndDate).locale("vi").format("dddd, DD/MM/YYYY")
        : "Chưa cập nhập";

    const startDateStr = TaskDetail?.StartDate
        ? dayjs(TaskDetail.StartDate).locale("vi").format("dddd, DD/MM/YYYY")
        : "Chưa cập nhập";


    const refetch = async ()=>{
         await dispatch(fetchDetailTask({taskId:id}))
    }

    const [updateOpen,setUpdateOpen] = useState(false)

    const handleClose = ()=>{
        setUpdateOpen(false);
    }


    const handleDeleteTask = async ()=>{
            
            const response = await dispatch(fetchDeleteTask({taskId:TaskDetailRender.id}))
            if (response?.payload?.status == "Success") {
                toast.success("Xóa task thành công.")
                refetch();
                
    
            } else {
                toast.error("Lỗi: " + response?.payload?.message);
            }
    }



    return(
        <Box sx={{p:5}}>
                    <Box sx={{p:4, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",height:"73vh",overflowY:"auto",position:"relative"}}>
                        {loading?
                            
                            <LoadingContainer/>

                        :
                            <>
                                <Box sx={{display:"flex",gap:3}}>
                                    <ImageGroup src={TaskDetailRender?.Pic?? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} />
                                    <Box>

                                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                            {TaskDetailRender?.Name?? "Chưa cập nhập"}
                                        </Typography>

                                        <Typography mt={1}>
                                            Độ ưu tiên: {TaskDetailRender?.Priority?? "Chưa cập nhập"}
                                        </Typography>

                                        <Typography mt={1}>
                                            Trạng thái: {TaskDetailRender?.Status?? "Chưa cập nhập"}
                                        </Typography>

                                        <Typography mt={1}>
                                            Ngày bắt đầu: {startDateStr}
                                        </Typography>

                                        <Typography mt={1}>
                                            Ngày kết thúc: {endDateStr}
                                        </Typography>

                                    </Box>

                                </Box>

                                <Box sx={{overflowY:"auto"}}>
                                    
                                    <Box mt={1}>  
                                        <Typography variant="h6" sx={{fontWeight:600}}>
                                            Miêu tả:
                                        </Typography>
                                        <Typography sx={{fontSize:"1.2rem"}}>
                                            {TaskDetailRender?.Description?? "Chưa cập nhập"}
                                        </Typography>
                                    </Box>

                                    <Box mt={1}>
                                        <Typography variant="h6" sx={{fontWeight:600}}>
                                            Note bổ sung:
                                        </Typography>

                                        <Typography sx={{ fontSize:"1.2rem"}}>
                                        {TaskDetailRender?.AdditionalNotes?? "Chưa cập nhập"}
                                        </Typography>
                                    </Box>

                                </Box>

                                <Box sx={{position:"absolute",bottom:0,right:0,p:2,display:"flex", gap:3}}>
                                    <IconButton
                                        disabled = {loading}
                                        sx={{
                                            backgroundColor: "#ff4444",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#ff3333" },
                                            width: { xs: 36, sm: 50 },
                                            height: { xs: 36, sm: 50 },
                                            fontSize: { xs: "small", sm: "medium" },
                                            borderRadius: 2
                                        }}
                                        onClick={()=>handleDeleteTask()}
                                        >
                                        
                                        <DeleteIcon  />
                                    </IconButton>



                                    <IconButton
                                        sx={{
                                            backgroundColor: "#ff4444",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#ff3333" },
                                            width: { xs: 36, sm: 50 },
                                            height: { xs: 36, sm: 50 },
                                            fontSize: { xs: "small", sm: "medium" },
                                            borderRadius: 2
                                        }}
                                        onClick={()=>setUpdateOpen(true)}
                                        >
                                        
                                        <EditDocumentIcon  />
                                    </IconButton>


                                </Box>
                            </>
                                    
                        }

                        


                    </Box>


            <UpdateDialog TaskData={TaskDetailRender} open={updateOpen} onClose ={handleClose}onSuccess={refetch}></UpdateDialog>
        </Box>
    )
}