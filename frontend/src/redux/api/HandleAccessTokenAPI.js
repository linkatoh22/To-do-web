import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
export const resetAccessToken = async()=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/handle-access-token`,
            {},
            {
                withCredentials: true
            }
        );

        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken",accessToken)
    }
    catch(error){
        toast.error("Phiên đăng nhập hết hạn... Vui lòng đăng nhập lại")
        localStorage.removeItem("accessToken");
        
        console.error("Reset token failed, redirecting to login...", error);
        
        window.location.href = '/dang-nhap';
        throw error;
        
    }


}