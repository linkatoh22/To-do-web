import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

import { AllTaskSearchContainer } from "../components/AllTaskSearchPage/AllTaskSearchContainer";
export function AllTaskSearchPage(){
    return(
        <AllTaskSearchContainer/>
    )
}