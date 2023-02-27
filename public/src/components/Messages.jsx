import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import {Message} from './Message';
import { auth } from "../firebase";

export const Messages = () => {
  const [messages,setMessages]=useState([])
  const {data} = useContext(ChatContext);
  const [currentUser,setCurrentUser]=useState({});


  useEffect(()=>{
    const unSub1=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    const unsub2=onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
      console.log(currentUser);
    })
    return ()=>{
      unSub1();
      unsub2();
    }
  },[data.chatId,currentUser]);
  return (
    <div className='messages'>
      {messages?.map(m=>(
        <Message message={m} key={m.id} founder={m.senderId===currentUser?.uid?"owner":""}/>
        
      ))}
    </div>
  )
}
