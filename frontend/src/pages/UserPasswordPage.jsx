import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { UserPassword } from "../components/UserPasswordPage/UserPassword";
export function UserPasswordPage(){
    return(
        <UserPassword/>
    )
}