import React, { useContext, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import Buffer from './Buffer';
export const Login = () => {
  const [err,setErr]=useState(false);
  const navigate=useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const{buffer,setBuffer}=useContext(AuthContext);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    setBuffer(true);
    try{
      await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db,"users",currentUser.uid),{
        [data.chatId+".activeSession"]:{
          lastSeen:Timestamp.now(),
          active:true,
        },
      })
      setBuffer(false);
      navigate("/");
    }catch(err){
      setErr(true);
      setBuffer(false);
    }      
  }
  return (
    <div className="formContainer">
       {buffer && <Buffer/>}
       <div className="formWrapper">
          <span className="logo">WhatsApp Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Sign in</button>
            {err && <span>Please Click One More Time</span>}
          </form>
          <p>You do have an account? <span style={{color:"#25D366"}}><Link to="/register">Register</Link></span></p>
       </div>
    </div>
  )
}
