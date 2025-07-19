import styled from "styled-components";
import { SignUpForm } from "../components/SignUpPage/SignUpForm";
import backgroundImage from "../assets/pic/background.jpg";
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

export function SignUpPage() {
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
            <SignUpForm />
        </Box>
    
    )
}