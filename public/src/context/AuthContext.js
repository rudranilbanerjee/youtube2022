import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect,useState } from "react";
import { auth } from "../firebase";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState({});
    const [showSideBar,setShowSideBar]=useState(true);
    const [showChat,setShowChat]=useState(false);
    const [isUser,setIsUser]=useState(false);
    const [buffer,setBuffer]=useState(false);
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            // console.log(currentUser);
        })
        return ()=>{
            unsub();
        }
    },[currentUser]);
    return (
        <AuthContext.Provider value={{
            currentUser,
            showSideBar,setShowSideBar,
            showChat,setShowChat,
            isUser,setIsUser,
            buffer,setBuffer
        }}>
            {children}
        </AuthContext.Provider>
    );
}