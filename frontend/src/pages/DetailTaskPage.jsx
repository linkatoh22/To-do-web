import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { DetailTaskContainer } from "../components/DetailTaskPage/DetailTaskComponent";
export function DetailTaskPage(){
    return(
        <DetailTaskContainer/>
    )
}