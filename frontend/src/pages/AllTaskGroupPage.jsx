import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { AllTaskGroupContainer } from "../components/AllTaskGroupPage/AllTaskGroupContainer";
export function AllTaskGroupPage(){
    return(
        <AllTaskGroupContainer/>
    )
}