import { createContext,useState,useEffect, Children } from "react";

export const AuthContext=createContext();

export function AuthProvider ({children}){
    const [accessToken,setAccessToken] = useState(null)
    
    const login = (token) =>{
        setAccessToken(token);
        localStorage.setItem('accessToken',token)
    }

    const logout = ()=>{
        setAccessToken(null);
        localStorage.removeItem('accessToken')
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && token !== "undefined" && token !== "null") {
            setAccessToken(token);
        }

    }, []);

    return(
        <AuthContext.Provider value={{accessToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}