import { useContext, useEffect, useState } from "react";
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

export function HomePageContainer(){
    const [open, setOpen] = useState(false);
     const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <>
        <Box sx={{p:6}}>

            <Typography variant="h4" sx={{fontWeight:600}}>Chào mừng trở lại, Sundar</Typography>

            <Box sx={{p:4, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                <Grid container spacing={2}>

                    <Grid size={{ xs: 6, md: 6 }} >

                        {/* Thêm task mới */}
                        <Paper elevation={2} sx={{p:4}}>

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <ReorderIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></ReorderIcon>

                                    <Box>To - Do</Box>
                                </Typography>


                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",cursor:"pointer",gap:1}} onClick={handleClickOpen}>
                                        <AddIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}}></AddIcon>
                                           <Box>  Thêm task mới</Box>
                                </Typography>
                                

                                

                            </Box>

                            <Box sx={{display:"flex",flexDirection:"column",gap:2}}> 
                                <TaskCard/>
                                <TaskCard/>
                                <TaskCard/>
                                

                            </Box>
                            


                        </Paper>
                    </Grid>


                    <Grid size={{ xs: 6, md: 6 }} >
                        {/* Trạng thái các task */}
                        <Paper elevation={2} sx={{p:4}}>

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <PlaylistAddCheckIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></PlaylistAddCheckIcon>
                                    <Box>Trạng thái Task</Box>
                                </Typography>
                                
                            </Box>
                            

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>
                                <DonutChart Color={"#00C49F"} Status={{label:"Hoàn thành",value:30}}AllStatus={{label:"Còn lại",value:50}}></DonutChart>

                                <DonutChart Color={"var(--blue-800)"} Status={{label:"Đang làm",value:25}}AllStatus={{label:"Còn lại",value:50}}></DonutChart>


                                <DonutChart Color={"var(--error-800)"} Status={{label:"Chưa bắt đầu",value:10}}AllStatus={{label:"Còn lại",value:50}}></DonutChart>

                            </Box>

                        </Paper>


                        {/* Các task đã hoàn thành */}
                        <Paper elevation={2} sx={{p:4,mt:2}}>

                            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between",mb:1}}>

                                <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",color:"#F24E1E",gap:1}}>
                                    <PlaylistAddCheckIcon sx={{color:"#A1A3AB",fontSize:"1.7rem"}}></PlaylistAddCheckIcon>
                                    <Box>Các task đã hoàn thành</Box>
                                </Typography>
                                
                            </Box>
                            

                            <Box sx={{display:"flex",flexDirection:"column",gap:2}}> 
                                <TaskCard/>
                                <TaskCard/>

                            </Box>

                            

                        </Paper>
                    </Grid>


                </Grid>


            </Box>
            
        </Box>
        
        <AddDialog
            open={open}
            onClose={handleClose}
        />
        </>
    )
}