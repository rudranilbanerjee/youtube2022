import React, { useContext, useState } from 'react';
import Add from "../img/Regis-Add.png";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,db,storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Buffer from './Buffer';
export const Register = () => {
  const [err,setErr]=useState(false);
  const{buffer,setBuffer}=useContext(AuthContext);
  const navigate=useNavigate();
  const [userName,setUserName]=useState("");
  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }
  const checkCredential=(e)=>{
    if(hasWhiteSpace(e.target.value)){
      alert("Spaces are not allowed,Pls fill username without space");
      setUserName(e.target.value.slice(0,e.target.value.indexOf(" ")));
    }else if(e.target.value.length>12){
      alert("Name should be under 12 letters");
      setUserName(e.target.value.slice(0,12));
    }
    else{
      setUserName(e.target.value)
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    let displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    displayName=capitalizeFirstLetter(displayName);
    setBuffer(true);
    try{
      const res= await createUserWithEmailAndPassword(auth, email, password);
      console.log(res)
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on( 
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL,
            })
            await setDoc(doc(db,"users",res.user.uid),{
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL
            })
            await setDoc(doc(db,"userChats",res.user.uid),{

            })
            setBuffer(false);
            navigate("/");
          });
        }
      );
       
    }catch(err){
      setBuffer(false);
      setErr(true);
    }      
  }
  return (
    <div className="formContainer">
      {buffer && <Buffer/>}
       <div className="formWrapper">
          <span className="logo">WhatsApp Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input value={userName} type="text" placeholder="User Name" onChange={checkCredential}/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <input style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="file">
                <img src={Add} alt="" />
                <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>You do have an account? <span style={{color:"#25D366"}}><Link to="/login">Login</Link></span></p>
       </div>
    </div>
  )
}
