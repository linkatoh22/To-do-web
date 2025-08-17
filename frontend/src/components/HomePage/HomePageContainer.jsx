import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TaskCard } from "../TaskCard";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Drawer,
  Grid
} from "@mui/material"
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { DonutSmall } from "@mui/icons-material";
import ReorderIcon from '@mui/icons-material/Reorder';
import { DonutChart } from "./TaskStatusChart";
import { AddDialog } from "../TaskDialog/AddDialog";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllTask,fetchNearestDeadlineTask,fetchNearestCompleteTask,fetchCreateTask } from "../../redux/thunk/dashBoardThunk";


export function HomePageContainer(){
    const dispatch = useDispatch();
    const {loading,AllTask,AllDeadlineTask,AllCompleteTask} = useSelector(s=>s.dashBoard)

    const AllTaskNow = useMemo(()=>{
        return AllTask
    },[AllTask])

    const AllTaskDeadline = useMemo(()=>{
        return AllDeadlineTask
    },[AllDeadlineTask])

    const AllTaskComplete = useMemo(()=>{
        return AllCompleteTask
    },[AllCompleteTask])

    

    useEffect(()=>{
        const fetchAllTaskAsync = async ()=>{
        
           try {
                await dispatch(fetchAllTask());
                await dispatch(fetchNearestDeadlineTask());
                await dispatch(fetchNearestCompleteTask());

            } catch (error) {
                console.error("Lỗi khi fetchAllTask:", error);
            }
        }
        fetchAllTaskAsync()
    },[])

    const [open, setOpen] = useState(false);
     const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HandleCreateTask = async(data)=>{
    
        // await dispatch(fetchCreateTask(data))
    }
    return(
        <>
        <Box sx={{px:4,py:2}}>
            
            <Box sx={{p:2, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                <Box sx={{display:"flex",gap:1}}>
                    {/* TASK */}
                    <Box sx={{width:"50%"}} >

                        {/* Thêm task mới */}
                        <Paper elevation={2} sx={{p:2,height:"74vh"}}>

                            {loading?
                            
                            <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2}}>
                            
                                <CircularProgress size="5rem" ></CircularProgress>
                                <Typography>Dữ liệu đang tải vui lòng đợi....</Typography>
                            </Box>

                            :
                            <>

                                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",height:"5%"}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <ReorderIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></ReorderIcon>

                                    <Box>Việc cần làm</Box>
                                </Typography>


                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",cursor:"pointer",gap:1}} onClick={handleClickOpen}>
                                        <AddIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}}></AddIcon>
                                           <Box>  Thêm công việc mới</Box>
                                </Typography>
                                

                                

                            </Box>

                            <Box sx={{display:"flex",flexDirection:"column",gap:2,justifyContent:"center",height:"95%"}}> 
                                {
                                    AllTaskDeadline?.length > 0
                                        ? AllTaskDeadline.map((item) => (
                                            <TaskCard TaskData={item} key={item.id} />
                                        ))
                                        : <div>Không có data</div>
                                }
                                
                                

                            </Box>
                            </>
                        
                            }
                            
                            


                            
                            


                        </Paper>
                    </Box>


                    <Box sx={{width:"50%",height:"75vh"}} >
                        {/* Trạng thái các task */}
                        <Paper elevation={2} sx={{p:4,height:"40%"}}>

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <PlaylistAddCheckIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></PlaylistAddCheckIcon>
                                    <Box>Trạng thái Task</Box>
                                </Typography>
                                
                            </Box>
                            
                            

                            {loading?
                            
                                <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2}}>
                                
                                    <CircularProgress size="5rem" ></CircularProgress>
                                    <Typography>Dữ liệu đang tải vui lòng đợi....</Typography>
                                </Box>

                                :
                                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>

                                    <DonutChart Color={"#00C49F"} 
                                    Status={{
                                        label:"Hoàn thành",
                                        value:AllTaskNow.countComplete?? 0
                                    }}
                                    AllStatus={{
                                            label:"Còn lại",
                                            value:(AllTaskNow.countNotAll+AllTaskNow.countStarted+AllTaskNow.countNotStarting)
                                    }}></DonutChart>

                                    <DonutChart Color={"var(--blue-800)"} 
                                        Status={{
                                            label:"Đang làm",
                                            value:AllTaskNow.countStarted?? 0
                                        }}
                                        AllStatus={{
                                            label:"Còn lại",
                                            value:(AllTaskNow.countNotAll+AllTaskNow.countComplete+AllTaskNow.countNotStarting)
                                        }}></DonutChart>


                                    <DonutChart Color={"var(--error-800)"} Status=
                                        {{
                                            label:"Chưa bắt đầu",
                                            value:AllTaskNow.countNotStarting?? 0
                                        }}
                                        AllStatus={{
                                            label:"Còn lại",
                                            value:(AllTaskNow.countNotAll+AllTaskNow.countStarted+AllTaskNow.countComplete)
                                            }}></DonutChart>

                                </Box>

                            
                            }



                            
                        </Paper>


                        {/* Các task đã hoàn thành */}
                        <Paper elevation={2} sx={{p:4,mt:3.3,height:"43%"}}>

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1,height:"5%"}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <PlaylistAddCheckIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></PlaylistAddCheckIcon>
                                    <Box>Các task đã hoàn thành</Box>
                                </Typography>
                                
                            </Box>
                            
                            
                            {loading?
                            
                                    <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2}}>
                                    
                                        <CircularProgress size="5rem" ></CircularProgress>
                                        <Typography>Dữ liệu đang tải vui lòng đợi....</Typography>
                                    </Box>

                                    :
                                    <>
                                        
                                    </>
                            
                                }
                                
                                {loading?
                            
                                    <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2}}>
                                    
                                        <CircularProgress size="5rem" ></CircularProgress>
                                        <Typography>Dữ liệu đang tải vui lòng đợi....</Typography>
                                    </Box>

                                    :
                                    <Box sx={{display:"flex",flexDirection:"column",gap:1,justifyContent:"center",height:"95%"}}> 
                                        {
                                            AllTaskComplete?.length > 0
                                                ? AllTaskComplete.map((item) => (
                                                    <TaskCard TaskData={item} key={item.id} />
                                                ))
                                                : <div>Không có data</div>
                                        }

                                    </Box>
                            
                                }


                            

                            

                        </Paper>
                    </Box>


                </Box>


            </Box>
            
        </Box>
        
        <AddDialog
            open={open}
            onClose={handleClose}
            onSuccess={HandleCreateTask}
        />
        </>
    )
}