import { createContext,useState,useEffect, Children } from "react";

export const AuthContext=createContext();

export function AuthProvider ({children}){
    const [accessToken,setAccessToken] = useState(null)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")

    const login = (token,{username,email}) =>{
        setAccessToken(token);
        setUsername(username)
        setEmail(email)
        localStorage.setItem('accessToken',token)
        localStorage.setItem('username',username)
        localStorage.setItem('email',email)
        
    }

    const logout = ()=>{
        setAccessToken(null);
        setUsername(null)
        setEmail(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && token !== "undefined" && token !== "null") {
            setAccessToken(token);
        }

    }, []);

    return(
        <AuthContext.Provider value={{accessToken,username,email,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}