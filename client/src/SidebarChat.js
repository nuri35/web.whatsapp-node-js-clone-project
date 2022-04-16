import React,{useEffect, useState} from 'react'
import "./SidebarChat.css"
import {Avatar,IconButton} from "@material-ui/core"



function SidebarChat(props) {



return (
    <>
    
   
          <div className='SidebarChat'>
      <Avatar src={props.friend.google.avatar} />
<div className='sidebarChat__info'>
<h2>{props.friend.google.name}</h2>
<p>nasıl oldun kardesim</p>
</div>

    </div>
         
    
  
    
    </>
    

   
  )
}

export default SidebarChat