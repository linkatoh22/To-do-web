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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroup,fetchDetailGroup } from "../../redux/thunk/groupThunk";

export function GroupPageContainer(){
    const dispatch = useDispatch();
    const {AllGroup,GroupDetail,loading} =useSelector(s=>s.group) 
    const [open, setOpen] = useState(false);

    
    const allGroupRender = useMemo(()=>{
        return AllGroup
    },[AllGroup])
    
    useEffect(()=>{
        const useFetchAllGroup = async()=>{
            await dispatch(fetchAllGroup())
        }
        useFetchAllGroup();
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const refetch = async ()=>{
        await dispatch(fetchAllGroup())
    }

    return (
        <>
        <Box sx={{p:6}}>
             <Box sx={{p:6, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

                    
                    <Typography variant="h5" sx={{fontWeight:600,mb:2,borderBottom:"3px solid #F24E1E"}}>Nhóm của bạn</Typography>


                    <Typography variant="h6" sx={{fontWeight:600,display:"flex", alignItems:"center",cursor:"pointer",gap:1}} onClick={handleClickOpen}> 
                            <AddIcon sx={{color:"#F24E1E",fontSize:"1.7rem"}}></AddIcon>
                                <Box>  Thêm task mới</Box>
                    </Typography>

                    
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>

                    {
                        allGroupRender?.length > 0
                            ? allGroupRender.map((item) => (
                                <Grid item size={{ xs: 2, sm: 4, md: 3 }}>
                                    <GroupCard groupData ={item} refetch={refetch}></GroupCard>
                                </Grid>
                            ))
                            : <div>Không có data</div>
                    }


                </Grid>


             </Box>
        </Box>
        <AddGroupDialog
            onSuccess={refetch}
            open={open}
            onClose={handleClose}
        ></AddGroupDialog>




        </>
    )
}