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
import { fetchCreateTask } from "../../redux/thunk/taskThunk";
import { fetchAllGroup } from "../../redux/thunk/groupThunk";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
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


export function AddDialog({open,onClose,onSuccess}){
    const [isChange,setIsChange] = useState(false)
    const dispatch = useDispatch();
    const {AllGroup,loading} =useSelector(s=>s.group) 
   

    

    useEffect(()=>{
        const usefetchAllGroup = async()=>{
            await(dispatch(fetchAllGroup()))
        }
        usefetchAllGroup();
    },[])

    const AllGroupRender = useMemo(()=>{
        return AllGroup
    },[AllGroup])

    

    const [formData, setFormData] = useState({
            Name: "",
            GroupId: "",
            Status:"",
            Priority: "",
            StartDate:dayjs(),
            EndDate:dayjs(),
            Description: "",
            AdditionalNotes:"",
            Pic:null
          })

     const handleInputChange = (key,value) => {
        setIsChange(true)
        setFormData((prev) => ({
          ...prev,
          [key]:value
        }))
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (formData.EndDate.isSame(formData.StartDate) || formData.EndDate.isBefore(formData.StartDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }
        const payload = {
            ...formData,
            StartDate: formData.StartDate ? formData.StartDate.format("YYYY-MM-DD") : null,
            EndDate: formData.EndDate ? formData.EndDate.format("YYYY-MM-DD") : null
        };
       
        const response = await dispatch(fetchCreateTask({payload:payload}))
        
        if (response?.payload?.status == "Success") {
            toast.success("Thêm task thành công.")
            onSuccess();
            onClose();

        } else {
            toast.error("Lỗi: " + response?.payload?.message);
        }
    }


    //UPLOAD PIC
    const [dragOver, setDragOver] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDragOver(false)
    }


    const handleFileSelect = (file) => {
            setIsChange(true)
            setFormData((prev) => ({
                ...prev,
                Pic: file
            }));
        };



    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
        handleFileSelect(files[0])
        }
    }

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };
    


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
                            <Grid container spacing={3}>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    {/* TÊN TASK */}
                                    <Box >
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tên task:</Typography>
                                        <TextField fullWidth  id="fullWidth" required onChange={(e)=>handleInputChange("Name",e.target.value)} value={formData.Name}/>
                                    </Box>

                                    <Box sx={{mt:2}}>
                                    {/* STATUS */}
                                    
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tình trạng:</Typography>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            required onChange={(e)=>handleInputChange("Status",e.target.value)} 
                                            value={formData.Status}
                                        >
                                            <FormControlLabel value="Chưa bắt đầu" control={<Radio />} label="Chưa bắt đầu" />
                                            <FormControlLabel value="Đang làm" control={<Radio />} label="Đang làm" />
                                            <FormControlLabel value="Hoàn thành" control={<Radio />} label="Hoàn thành" />
                                            
                                        </RadioGroup>
                                    
                                    </Box>


                                    {/* START DATE */}
                                    <Box sx={{mt:2}}>
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Ngày bắt đầu:</Typography>
                                        <DatePicker
                                           value={formData.StartDate}
                                            onChange={(newValue) => handleInputChange("StartDate", newValue)}
                                            slots={{ textField: TextField }}
                                            slotProps={{ textField: { required: true } }}
                                            enableAccessibleFieldDOMStructure={false}
                                        />
                                    </Box>



                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    {/* CHỌN NHÓM */}
                                    <Box >
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Chọn nhóm:</Typography>
                                        <FormControl fullWidth>
                                            
                                            
                                            <Select
                                                required 
                                                onChange={(e)=>handleInputChange("GroupId",e.target.value)} 
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formData.GroupId}
                                                
                                                inputProps={{ 'aria-label': 'Without label' }}
                                               
                                            >
                                                <MenuItem value="">Không chọn</MenuItem>
                                                {AllGroupRender?.map((item)=>{
                                                    return <MenuItem value={item?.id}>{item.Name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    {/* CHỌN PRIORITY */}
                                    <Box sx={{mt:2}}>
                                        
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Độ ưu tiên:</Typography>
                                        <RadioGroup
                                            required onChange={(e)=>handleInputChange("Priority",e.target.value)} value={formData.Priority}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Thấp" control={<Radio />} label="Thấp" />
                                            <FormControlLabel value="Trung bình" control={<Radio />} label="Trung bình" />
                                            <FormControlLabel value="Cao" control={<Radio />} label="Cao" />
                                            
                                        </RadioGroup>
                                        
                                    </Box>

                                    {/* END DATE */}
                                    <Box sx={{mt:2}}>
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Ngày kết thúc:</Typography>
                                        <DatePicker
                                            value={formData.EndDate}
                                            onChange={(newValue) => handleInputChange("EndDate", newValue)}
                                            slots={{ textField: TextField }}
                                            slotProps={{ textField: { required: true } }}
                                            enableAccessibleFieldDOMStructure={false}
                                        />
                                    </Box>
                                </Grid>

                            </Grid>
                            
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6, md: 6 }} >
                                    {/* MIÊU TẢ */}
                                    <Box sx={{mt:3}}>

                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Miêu tả:</Typography>
                                        <TextField
                                            onChange={(e)=>handleInputChange("Description",e.target.value)} value={formData.Description}
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            maxRows={5}
                                            placeholder="Nhập miêu tả…"
                                            
                                        />
                                    </Box>
                                    {/* NOTE */}
                                    <Box sx={{mt:2}}>
                                        <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Note thêm:</Typography>
                                        <TextField
                                            onChange={(e)=>handleInputChange("AdditionalNotes",e.target.value)} value={formData.AdditionalNotes}
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            maxRows={5}
                                            placeholder="Nhập miêu tả…"
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6, md: 6 }} >
                                    <Box sx={{ flex: 1,mt:1 }}>
                                            <Typography sx={{fontSize:"1.1rem",fontWeight:"bold"}}>Tải ảnh avatar:</Typography>

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
                                                    Kéo và thả ảnh vào đây
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    Hoặc
                                                </Typography>

                                                <Button 
                                                variant="outlined" 
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    document.getElementById('upload-input')?.click()
                                                }}
                                                >
                                                Tải file lên
                                                </Button>

                                                {formData.Pic && (
                                                <Typography variant="h7"  color="primary" sx={{ mt: 1 }}>
                                                    File đã nhận: {formData.Pic.name}
                                                </Typography>
                                                )}

                                            </UploadArea>
                                            <input
                                                type="file"
                                                onChange={handleFileInputChange}
                                                style={{ display: "none" }}
                                                id="upload-input"
                                                />
                                    </Box>

                                </Grid>

                            </Grid>


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
                                    
                                        disabled={!isChange ||loading}
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
                                        Thêm Task
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