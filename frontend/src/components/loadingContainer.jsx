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
import CircularProgress from '@mui/material/CircularProgress';
export function LoadingContainer (){
    return(


        <Box sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2}}>
                                    
                                        <CircularProgress size="5rem" ></CircularProgress>
                                        <Typography>Dữ liệu đang tải vui lòng đợi....</Typography>
                                    </Box>
    )

}