import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { AllTaskContainer } from "../components/AllTaskPage/AllTaskContainer";
export function AllTaskPage(){
    return(
        <AllTaskContainer/>
    )
}