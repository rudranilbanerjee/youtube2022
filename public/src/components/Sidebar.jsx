import React, { useContext } from 'react'
import {Navbar} from './Navbar';
import {Search} from './Search';
import {Chats} from './Chats';
import { AuthContext } from '../context/AuthContext';

export const Sidebar = () => {
  const {showSideBar}=useContext(AuthContext);
  return (
    <div className={`sideBar ${showSideBar?"showSideBar":"closeSideBar"}`}>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}
