
import { Button, Grid, MenuItem,Box,Typography,IconButton,FormControl,InputLabel,Select } from "@mui/material";
import styled from "styled-components";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from "@mui/icons-material"
import { useContext, useEffect, useMemo, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { TaskCardNoNav } from "../TaskCardNoNav";
import {fetchTaskGroupSort} from "../../redux/thunk/taskThunk"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector,useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { AddDialog } from "../TaskDialog/AddDialog";
import { UpdateDialog } from "../TaskDialog/UpdateDialog";
import AddIcon from '@mui/icons-material/Add';
import { fetchDeleteTask } from "../../redux/thunk/taskThunk";
import { toast } from "react-toastify";
const ImageGroup = styled.img`
    width:30%; 
    aspect-ratio: 1 / 1;
     object-fit: cover;
     border-radius: 10px;
`

export function AllTaskGroupContainer(){
    const {TaskGroup,loading} = useSelector(s=>s.task)
    const dispatch = useDispatch();
    const [sortBy,setSortBy] = useState("")
    const [status,setStatus] = useState("")
    const [taskSelected, setTaskSelected] = useState(0)
    const {groupId} = useParams()
    const taskSortRender = useMemo(()=>{
        return TaskGroup
    },[TaskGroup])
    
    const handleSortBy = (value)=>{
        setSortBy(value)
    }

    const handleStatus = (value)=>{
        setStatus(value)
    }

    useEffect(()=>{
        const fetchTaskSortFunc = async ()=>{
            await dispatch(fetchTaskGroupSort({sortBy:sortBy,status:status,groupId:groupId}))
        }

        fetchTaskSortFunc();
    },[sortBy,status,groupId])

    const handleselectedTask = (index)=>{
        setTaskSelected(index)
    }

    //UPDATE
    const [openUpdate,SetOpenUpdate] = useState(false)
    const handleCloseUpdate = ()=>{
        SetOpenUpdate(false)
    }
    
    
    //ADD
    const [openAdd,SetOpenAdd] = useState(false)
    const handleCloseAdd = ()=>{
        SetOpenAdd(false)
    }
    

    //REFETCH
    const refetch = async ()=>{
            await dispatch(fetchTaskGroupSort({sortBy:sortBy,status:status,groupId:groupId}))
    }

    //DELETE
    const handleDeleteTask = async (id)=>{
        
        const response = await dispatch(fetchDeleteTask({taskId:id}))
        if (response?.payload?.status == "Success") {
            toast.success("Xóa task thành công.")
            refetch();
            

        } else {
            toast.error("Lỗi: " + response?.payload?.message);
        }
    }


    const dateConvert = (date)=>{
        return date
            ? dayjs(date).locale("vi").format("dddd, DD/MM/YYYY")
            : "Chưa cập nhập";}
    
    return(
        <Box sx={{p: 5}}>
            <Typography variant="h5" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E"}}>Nhóm của bạn</Typography>
            <Box sx={{display:"flex",gap:2}}>
                

                
                        <Box sx={{p:3, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",width:"40%"}}>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",py:1}}>


                                <Typography variant="h7" sx={{fontWeight:600,display:"flex", alignItems:"center",cursor:"pointer",gap:1}} onClick={()=>SetOpenAdd(true)}>
                                    <AddIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}}></AddIcon>
                                        <Box>  Thêm task mới</Box>
                                </Typography>


                                    {/* SELECT HERE */}
                                <Box sx={{display:"flex",gap:1,width:"50%",alignItems:"center"}}>
                                    {/* SẮP XẾP THEO */}

                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sortBy}
                                                label="Sắp xếp theo"
                                                onChange={(e)=>handleSortBy(e.target.value)}
                                                
                                                
                                            >
                                                <MenuItem value="" >Tất cả</MenuItem>
                                                <MenuItem value="deadline" >Deadline</MenuItem>
                                                <MenuItem value="priorityDESC">Ưu tiên cao</MenuItem>
                                                <MenuItem value="priorityASC" >Ưu tiên thấp</MenuItem>
                                                
                                            </Select>
                                    </FormControl>
                                    {/* TRẠNG THÁI */}


                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                label="Trạng thái"
                                                onChange={(e)=>handleStatus(e.target.value)}
                                                size="small"
                                            >
                                                <MenuItem value="" >Tất cả</MenuItem>
                                                <MenuItem value="Chưa bắt đầu" >Chưa bắt đầu</MenuItem>
                                                <MenuItem value="Đang làm" >Đang làm</MenuItem>
                                                <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
                                            </Select>
                                    </FormControl>

                                </Box>
                            
                            </Box>

                            <Box sx={{height:"67vh",overflowY:"auto"}}>

                            
                                <Box sx={{display:"flex",flexDirection:"column",gap:2,py:1}}>
                                    {
                                        taskSortRender?.length>0?
                                        
                                            taskSortRender.map((item,index)=>{
                                                return  <div style={{padding:0}} onClick={()=>handleselectedTask(index)}>
                                                        <TaskCardNoNav 
                                                        TaskData={item} 
                                                        key={index} 
                                                        BackgroundColor={taskSelected==index? "#A1A3AB2B":"white"} 
                                                        
                                                        ></TaskCardNoNav>
                                                    </div>
                                            })
                                        :
                                        <div>Không có thông tin</div>
                                        
                                    }
                                
                                </Box>
                            </Box>
                        </Box>

                

                
                        <Box sx={{p:4, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",width:"50%",position:"relative"}}>

                            {
                                taskSortRender?.length>0?
                                <>
                                    <Box sx={{display:"flex",gap:3}}>
                                        <ImageGroup 
                                            src={taskSortRender[taskSelected]?.Pic??"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                                            />
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                {taskSortRender[taskSelected]?.Name}
                                            </Typography>
                                            <Box pt={1}>
                                                <Typography>Nhóm: {taskSortRender[taskSelected]?.Group.Name?? "Chưa cập nhập"}</Typography>
                                                <Typography>Ưu tiên: {taskSortRender[taskSelected]?.Priority ?? "Chưa cập nhập"}</Typography>
                                                <Typography>Trạng thái: {taskSortRender[taskSelected]?.Status?? "Chưa cập nhập"}</Typography>
                                                <Typography>Ngày bắt đầu: {dateConvert(taskSortRender[taskSelected]?.StartDate)}
                                                </Typography>
                                                <Typography>Ngày kết thúc: {dateConvert(taskSortRender[taskSelected]?.EndDate)}</Typography>

                                                
                                            </Box>
                                        </Box>

                                    </Box>

                                    <Box sx={{overflowY:"auto"}}>
                                        <Box mt={1}>
                                            <Typography variant="h6" sx={{fontWeight:600}}>
                                                Miêu tả:
                                            </Typography>
                                            <Typography sx={{fontSize:"1.2rem"}}>
                                                {taskSortRender[taskSelected]?.Description?? "Chưa cập nhập"}
                                            </Typography>
                                        </Box>
                                        
                                        <Box mt={1}>
                                            <Typography variant="h6" sx={{fontWeight:600}}>
                                                Note bổ sung:
                                            </Typography>
                                            <Typography sx={{fontSize:"1.2rem"}}>
                                                {taskSortRender[taskSelected]?.AdditionalNotes?? "Chưa cập nhập"}
                                            </Typography>
                                        </Box>

                                    </Box>

                                    <Box sx={{position:"absolute",bottom:0,right:0,p:2,display:"flex", gap:3}}>
                                        <IconButton
                                            onClick={()=>handleDeleteTask(taskSortRender[taskSelected]?.id)}
                                            sx={{
                                                backgroundColor: "#ff4444",
                                                color: "white",
                                                "&:hover": { backgroundColor: "#ff3333" },
                                                width: { xs: 36, sm: 50 },
                                                height: { xs: 36, sm: 50 },
                                                fontSize: { xs: "small", sm: "medium" },
                                                borderRadius: 2
                                            }}
                                            >
                                            
                                            <DeleteIcon />
                                        </IconButton>



                                        <IconButton
                                            onClick={()=>SetOpenUpdate(true)}
                                            sx={{
                                                backgroundColor: "#ff4444",
                                                color: "white",
                                                "&:hover": { backgroundColor: "#ff3333" },
                                                width: { xs: 36, sm: 50 },
                                                height: { xs: 36, sm: 50 },
                                                fontSize: { xs: "small", sm: "medium" },
                                                borderRadius: 2
                                            }}
                                            >
                                            
                                            <EditDocumentIcon  />
                                        </IconButton>


                                    </Box>
                                
                                </>
                                :
                                <Box sx={{textAlign:"center"}}>Không có dữ liệu hiển thị</Box>
                                
                            
                            }           
                            
                        </Box>
                    
            

            <UpdateDialog TaskData={
                            taskSortRender[taskSelected]} 
                            open={openUpdate}
                            onClose={handleCloseUpdate}
                            onSuccess={refetch}></UpdateDialog>
            <AddDialog 
                open={openAdd}
                onClose={handleCloseAdd}
                onSuccess={refetch}
            
            ></AddDialog>
            
                
            </Box>
        </Box>
    )
}