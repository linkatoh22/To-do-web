import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { HomePageContainer } from "../components/HomePage/HomePageContainer";
export function HomePage(){
    return(
        <HomePageContainer/>
    )
}