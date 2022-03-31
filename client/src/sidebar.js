import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,IconButton} from "@material-ui/core"
import SidebarChat from "./SidebarChat"

function sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
<Avatar src="https://joeschmoe.io/api/v1/random" />
      <div className='sidebar__headerRight'>

      <IconButton>
        <ChatIcon />
      </IconButton>

      

      <IconButton>
        <MoreVertIcon />
      </IconButton>
      </div>

        </div>

        <div className='sidebar__search'>
      <div className='sidebar__searchContainer'>

    <SearchOutlinedIcon />
    <input placeholder='Search ' type="text" />
      </div>

        </div>

        <div className='sidebar__chats'>
        
    <SidebarChat />
  

        </div>
        
        </div>
  )
}

export default sidebar