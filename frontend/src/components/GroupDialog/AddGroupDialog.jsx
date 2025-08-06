import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import {
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Grid,
  Typography,
  TextField,
  DialogContent,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Paper
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import Textarea from '@mui/joy/Textarea';
import { styled } from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
const UploadArea = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.drag-over': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  }
}))



export function AddGroupDialog({open,onClose}){
    const [formData, setFormData] = useState({
            name: "",
            description: "",
            image: undefined
          })
    const [dragOver, setDragOver] = useState(false)

    const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

     const handleInputChange = (key,value) => {
        setFormData((prev) => ({
          ...prev,
          [key]:value
        }))
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)
        if (formData.endDate.isSame(formData.startDate) || formData.endDate.isBefore(formData.startDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }
    }
    return(
        <Dialog 
            open={open}
            onClose={onClose}
            fullWidth maxWidth="lg"
            >
            
            <DialogTitle variant="h5" sx={{ m: 0, p: 2,fontWeight:"bold" }} id="customized-dialog-title">
                Thêm task mới
            </DialogTitle>

            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon />
            </IconButton>

            <DialogContent>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{p:4, mt:2, borderRadius:1,border: "1px solid #A1A3ABA1"}}>
                                    {/* TÊN TASK */}
                           <Grid container spacing={3}>
                                <Grid size={{ xs: 6, md: 6 }} >
                                    <Box >
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tên task:</Typography>
                                        <TextField fullWidth  id="fullWidth" required onChange={(e)=>handleInputChange("name",e.target.value)} value={formData.name}/>
                                    </Box>

                                    <Box sx={{mt:2}}>

                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Miêu tả:</Typography>
                                        <TextField
                                            onChange={(e)=>handleInputChange("description",e.target.value)} value={formData.description}
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            maxRows={5}
                                            placeholder="Nhập miêu tả…"
                                            
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Upload Image
                                        </Typography>
                                        <UploadArea
                                            className={dragOver ? 'drag-over' : ''}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => document.getElementById('file-input')?.click()}
                                            sx={{ height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                                        >
                                            <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Drag&Drop files here
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            or
                                            </Typography>
                                            <Button 
                                            variant="outlined" 
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                document.getElementById('file-input')?.click()
                                            }}
                                            >
                                            Browse
                                            </Button>
                                            {formData.image && (
                                            <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                                                Selected: {formData.image.name}
                                            </Typography>
                                            )}
                                        </UploadArea>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileInputChange}
                                        />
                                        </Box>

                                </Grid>

                            </Grid>
                            {/* NOTE */}
                           
                            <Grid container spacing={2} sx={{mt:2}}>
                                <Grid item sx={{ xs: 12, md: 6 }}>
                                    <Button
                                                        
                                                        sx={{
                                                            
                                                            px: {
                                                                xs: 3, // mobile
                                                                sm: 3.5,   // tablet
                                                                md: 4, // desktop
                                                                lg: 4.5,   // large desktop
                                                            },
                                                            py: {
                                                                xs: 1, // mobile
                                                                sm: 1,   // tablet
                                                                md: 1.5, // desktop
                                                                lg: 1.5,   // large desktop
                                                            },
                                                            fontSize:{
                                                                xs: "0.95rem", // mobile
                                                                sm: "1rem",   // tablet
                                                                md: "1rem", // desktop
                                                                lg: "1.1rem",   // large desktop
                                                            }
                                                            , borderColor: '#FF6B6B',
                                                            color:"#FF6B6B", // Màu viền (outline)
                                                                '&:hover': {
                                                                borderColor: '#FF6B6B', // Màu viền khi hover
                                                                backgroundColor: 'rgba(255, 0, 0, 0.04)', // hiệu ứng nhẹ khi hover
                                                                }
                                                            
                                                        }}
                                                        variant="outlined"
                                                        >
                                                        HỦY
                                    </Button>
                                </Grid>


                                <Grid item sx={{ xs: 12, md: 6 }}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            
                                            px: {xs: 3, sm: 3.5, md: 4, lg: 4.5 },
                                            py: { xs: 1,sm: 1,md: 1.5,lg: 1.5},
                                            fontSize:{ xs: "0.95rem", sm: "1rem", md: "1rem",lg: "1.1rem" },
                                            background: "linear-gradient(45deg, #FF6B6B 30%, #FF8A80 90%)",
                                            color: "white",
                                            boxShadow: "none",
                                            "&:hover": {
                                            background: "linear-gradient(45deg, #FF8A80 30%, #FF6B6B 90%)",
                                            boxShadow: "none",
                                            },
                                        }}
                                        variant="contained"
                                        >
                                        Thêm TASK
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </form>
                </LocalizationProvider>
            </DialogContent>

        </Dialog>
    )
}