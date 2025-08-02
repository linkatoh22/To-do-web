import {Box,Grid,Typography,TextField,InputAdornment,Button, Link } from "@mui/material"


export function MessageBox({Title,Content,Icon}) {
    
      
    return (
       <Box sx={{
            width: { xs: "70%", sm: "70%", md: "60%",lg: "40%" },
            height: { xs: "65%", sm: "80%", md: "70%",lg: "50%" },
            backgroundColor: "white",
            borderRadius: "20px",
            
            display: "flex",
            flexDirection: "row",


            padding: { xs: 4, sm: 2, md: 3,lg: 4 },
            gap:{ xs: 3, sm: 4, md: 7,lg: 8 },
        }}>
            
            

            <Box sx={{
                display:"flex",
                flexDirection:"column",
                width:{ xs: "100%", sm: "100%", md: "100%",lg: "100%" },
                justifyContent:"center",
                gap:{ xs: 1, sm: 1.5, md: 2,lg: 2.5 },
                
            }}>
                <Typography 
                
                sx={
                    { 
                        mt: 2,
                        fontSize: {
                          xs: "1.5rem", // mobile
                          sm: "2rem",   // tablet
                          md: "2.5rem", // desktop
                          lg: "3rem",   // large desktop
                        },
                        textAlign:{
                            xs: "center", // mobile
                            sm: "center",   // tablet
                            md: "center", // desktop
                            lg: "center",   // large desktop
                          },
                        fontWeight: 700 ,
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        gap:0.5
                    }
                    
                    }>
                        
                        {Title}
                        {Icon}
                        </Typography>


                <Typography sx={
                    { 
                        mt: 2,
                        fontSize: {
                          xs: "1rem", // mobile
                          sm: "1rem",   // tablet
                          md: "1rem", // desktop
                          lg: "1.2rem",   // large desktop
                        },
                        textAlign:{
                            xs: "center", // mobile
                            sm: "center",   // tablet
                            md: "center", // desktop
                            lg: "left",   // large desktop
                          },
                        
                    }
                    
                    }>
                        {Content} </Typography>

                


            </Box>
            
            
                
        </Box>
    )

}
