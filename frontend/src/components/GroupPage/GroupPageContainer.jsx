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
import { GroupCard } from "../GroupCard";
import AddIcon from '@mui/icons-material/Add';
import { AddGroupDialog } from "../GroupDialog/AddGroupDialog";
import { useState } from "react";



export function GroupPageContainer(){

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
        <Box sx={{p:6}}>
             <Box sx={{p:4, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

                    
                    <Typography variant="h5" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E",width:"10%"}}>Nhóm của bạn</Typography>


                    <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",cursor:"pointer",gap:1}} onClick={handleClickOpen}> 
                            <AddIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}}></AddIcon>
                                <Box>  Thêm task mới</Box>
                    </Typography>

                    
                </Box>

                <Grid container sx={{display:"flex",justifyContent:"space-around",gap:0,flexWrap:"wrap"}}>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GroupCard></GroupCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GroupCard></GroupCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GroupCard></GroupCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GroupCard></GroupCard>
                    </Grid>

                </Grid>


             </Box>
        </Box>
        <AddGroupDialog
            open={open}
            onClose={handleClose}
        ></AddGroupDialog>




        </>
    )
}