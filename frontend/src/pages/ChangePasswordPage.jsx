
import styled from "styled-components";
import backgroundImage from "../assets/pic/background.jpg";

import Box from "@mui/material/Box";
import { ChangePasswordForm } from "../components/ChangepasswordPage/ChangePasswordForm";
import { useState } from "react";
import { MessageBox } from "../components/MessageBox";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

export function ChangePasswordPage() {
    const [isSuccess, setIsSuccess] = useState(false);
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
            
            
            { isSuccess?
                
                <MessageBox Title={"Đổi mật khẩu thành công"} Content={"Đã đổi mật khẩu thành công. Bạn có thể dùng mật khẩu này để đăng nhập vào tài khoản. Vui lòng đăng nhập lại!"} Icon={<CheckCircleIcon color="success" sx={{ fontSize: 50 }} />}></MessageBox>
                :
                <ChangePasswordForm setIsSuccess={setIsSuccess}></ChangePasswordForm>
                
            }
            
            
            
        </Box>
    
    )
}