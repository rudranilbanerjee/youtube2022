import { signOut } from 'firebase/auth';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { auth, db } from '../firebase';
export const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const[menuFlag,setMenuFlag]=useState(true);
  document.onclick=()=>{
    console.log("hh")
    setMenuFlag(true);
  }
  const handleMenu=(e)=>{
    console.log(e);
    e.stopPropagation();
    setMenuFlag(false);
  }
  return (
    <div className="navbar">
      <div className='user'>
        <div className="userImg">
          <img src={currentUser.photoURL} alt="" className='cover'/>
        </div>
        <span>{currentUser.displayName}</span>
      </div>
      <ul className='icon'>
        <li className='notify'>
          <i class="fa-solid fa-bell"></i>
          <span className='count'>5</span>
        </li>
        <li>
          <i class="fa-solid fa-message"></i>
        </li>
        <li className='log-box'>
          <i class="fa-solid fa-ellipsis-vertical" onClick={handleMenu}></i>
        </li>
      </ul>
      <div className={`menuBox ${menuFlag && "invisible"}`}>
        <ul>
          <li className="logout" onClick={async ()=>{
            await updateDoc(doc(db,"users",currentUser.uid),{
              [data.chatId+".activeSession"]:{
                lastSeen:Timestamp.now(),
                active:false,
              },
            })
            signOut(auth);
            }}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  )
}
