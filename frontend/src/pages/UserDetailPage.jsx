import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { UserDetailContainer } from "../components/UserDetailPage/UserDetailContainer";
export function UserDetailPage(){
    return(
        <UserDetailContainer/>
    )
}