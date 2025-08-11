import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/vi";
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
  Grid,
  Card,
CardContent,
CardMedia
} from "@mui/material"
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
export function TaskCard({TaskData}){
    

    const endDateStr = TaskData?.EndDate
        ? dayjs(TaskData.EndDate).locale("vi").format("dddd, DD/MM/YYYY")
        : "Chưa cập nhập";

    return(

        <a  href={`/task/detail-task/${TaskData?.id}`}
            style={{ textDecoration: 'none', color: 'inherit',cursor:"pointer" }}
            >
            <Card sx={{p:2,border: "1px solid #A1A3AB",borderRadius:4,display:'flex',gap:"1rem",justifyContent:"center",
            "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            },
            transition: "box-shadow 0.3s ease"}}
            onClick={()=>navigateDetail(TaskData?.id)}
            
            >
                
                <TripOriginIcon sx={{fontSize:"1.6rem",fontWeight:500,color:"var(--error-800)",cursor:"pointer"}}/>

                <Box sx={{display:'flex',flexDirection:"column", alignItems:"top",width:"90%",gap:"0.5rem"}}>
                        
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Box>
                                
                                    <Typography variant="h6" sx={{fontWeight:"bold"}}>{TaskData?.Name?? "Chưa cập nhập"}</Typography>
                                    <Typography sx={{fontSize:"1.1rem",color:"var(--grey-600)",fontWeight:400}}>{TaskData?.Description?? "Chưa cập nhập"}</Typography>
                                
                            </Box>

                            <CardMedia
                                component="img"
                                sx={{borderRadius:2,width:"20%", aspectRatio: "1 / 1", objectFit: "cover" }}
                                image={TaskData?.Pic??"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                                alt="Live from space album cover"
                            />
                        </Box>

                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

                            <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                            Độ ưu tiên: {TaskData?.Priority?? "Chưa cập nhập"}
                            </Typography>

                            <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                            Trạng thái: {TaskData?.Status?? "Chưa cập nhập"}
                            </Typography>

                            <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                                Deadline: {endDateStr}
                            </Typography>
                        </Box>
                    
                </Box>

               
            </Card>
        </a>
    )
}