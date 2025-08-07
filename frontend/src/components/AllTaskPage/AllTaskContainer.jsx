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

const ImageGroup = styled.img`
    width:30%; 
    aspect-ratio: 1 / 1;
     object-fit: cover;
     border-radius: 10px;
`

export function AllTaskContainer(){
    return(
         <Box sx={{p: 6,display:"flex",gap:2}}>
            

               
                    <Box sx={{p:4, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",width:"40%"}}>
                        <Typography variant="h5" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E"}}>Nhóm của bạn</Typography>
                        <Box sx={{height:"74vh",overflowY:"auto"}}>

                        
                            <Box sx={{display:"flex",flexDirection:"column",gap:2,py:1}}>
                                <TaskCard></TaskCard>
                                <TaskCard></TaskCard>
                                <TaskCard></TaskCard>
                                <TaskCard></TaskCard>
                                
                            
                            </Box>
                        </Box>
                    </Box>

               

               
                    <Box sx={{p:4, mt:2, borderRadius:3,border: "1px solid #A1A3ABA1",width:"50%",position:"relative"}}>

                        <Box sx={{display:"flex",gap:3}}>
                            <ImageGroup src="https://mui.com/static/images/cards/live-from-space.jpg" />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    Heat 1/2 cup of the broth in a pot until simmering.
                                </Typography>
                                <Typography>Priority: Extreme</Typography>
                                <Typography>Status: Extreme</Typography>
                                <Typography>Status: Extreme</Typography>
                            </Box>

                        </Box>

                        <Box sx={{overflowY:"auto"}}>
                            <Typography sx={{mt:2, fontSize:"1.2rem"}}>
                                Take the dog to the park and bring treats as well.
                                Take Luffy and Jiro for a leisurely stroll around the neighborhood. Enjoy the fresh air and give them the exercise and mental stimulation they need for a happy and healthy day. Don't forget to bring along squeaky and fluffy for some extra fun along the way!
                            </Typography>

                            <Typography sx={{mt:2, fontSize:"1.2rem"}}>
                            Listen to a podcast or audiobook
                            Practice mindfulness or meditation
                            Take photos of interesting sights along the way
                            Practice obedience training with your dog
                            Chat with neighbors or other dog walkers
                            Listen to music or an upbeat playlist
                            </Typography>

                        </Box>

                        <Box sx={{position:"absolute",bottom:0,right:0,p:2,display:"flex", gap:3}}>
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
                                >
                                
                                <EditDocumentIcon  />
                            </IconButton>


                        </Box>
                    </Box>
                
            
             
        </Box>
    )
}