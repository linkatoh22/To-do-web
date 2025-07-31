import styled from "styled-components";
import backgroundImage from "../assets/pic/background.jpg";
import { OtpVerifyForm } from "../components/OtpVerifyPage/OtpVerifyForm";
import Box from "@mui/material/Box";
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

export function OtpVerify() {
    return (

        <Box sx={{
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
           <OtpVerifyForm></OtpVerifyForm>
        </Box>
    
    )
}