import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
export const Chats = () => {
  const [chats,setChats]=useState([]);
  const {currentUser,setShowSideBar,setShowChat,setIsUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);
  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return ()=>{
        unsub();
      };
    };
    currentUser.uid && getChats() /// we use this condition because iniytially we dont have any currentuser after some time by api we get.
  },[currentUser.uid])
  //console.log(Object.entries(chats));
  const handleSelect=(u)=>{
    setShowChat(true);
    setShowSideBar(false);
    setIsUser(true);
    dispatch({type:"CHANGE_USER", payload:u})
  }
  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="dp"/>
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.senderId ===currentUser.uid?<i class="fa-solid fa-check-double"></i>:""} {chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
