import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
// import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

export default function GoogleSuccessPage(){
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    // const{login} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        
        if(accessToken){
            toast.success("Đăng nhập thành công")
            // login(accessToken)
            navigate("/")
        }
    },[accessToken])
    

    // useEffect(() => {
    //             document.title = "Đăng nhập thành công | DCAT Store";
    //             }, []);


    return(
        <div>Logging in via Google...</div>
    )
}