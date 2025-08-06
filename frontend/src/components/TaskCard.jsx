import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
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
export function TaskCard(){
    return(
        <Card sx={{p:2,border: "1px solid #A1A3AB",borderRadius:4,display:'flex',gap:"1rem",justifyContent:"center",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
        transition: "box-shadow 0.3s ease"}}>
            
            <TripOriginIcon sx={{fontSize:"1.6rem",fontWeight:500,color:"var(--error-800)",cursor:"pointer"}}/>

            <Box sx={{display:'flex',flexDirection:"column", alignItems:"top",width:"90%",gap:"0.5rem"}}>
                    
                    <Box sx={{display:"flex"}}>
                        <Box>
                            
                                <Typography variant="h6" sx={{fontWeight:"bold"}}>Attend Nischal’s Birthday Party</Typography>
                                <Typography sx={{fontSize:"1.1rem",color:"var(--grey-600)",fontWeight:400}}>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</Typography>
                            
                        </Box>

                        <CardMedia
                            component="img"
                            sx={{borderRadius:2,width:"20%", aspectRatio: "1 / 1", objectFit: "cover" }}
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                    </Box>

                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

                        <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                            Priority: Moderate
                        </Typography>

                        <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                            Status: Not Started
                        </Typography>

                        <Typography sx={{color:"#A1A3AB",fontSize:"0.8rem",display:"flex", alignItems:"center"}}>
                            Created on: 20/06/2023
                        </Typography>
                    </Box>
                
            </Box>

            <MoreHorizIcon sx={{fontSize:"1.6rem",cursor:"pointer"}}></MoreHorizIcon>
        </Card>
    )
}