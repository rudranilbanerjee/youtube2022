import React, { useEffect, useRef} from 'react'
// import { AuthContext } from '../context/AuthContext';
// import { ChatContext } from '../context/ChatContext';
export const Message = ({message,founder}) => {
  // const {currentUser}=useState(AuthContext);
  // const {data}=useState(ChatContext);
  const ref=useRef();
  // const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'});
  },[message]);
  return (
    <div ref={ref} className={`message ${founder} ${message.img && "imageSend"}`}>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="sendImg"/>}
      </div>
      <div className="messageInfo">
        <span>Just Now</span>
      </div>
    </div>
  )
}
