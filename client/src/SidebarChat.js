import React,{useEffect, useState,useContext} from 'react'

import "./SidebarChat.css"
import "./friend.scss"
import {Avatar} from "@material-ui/core"
import moment from 'moment';
moment.locale("tr")
import Badge from '@mui/material/Badge';

import { HiOutlineCheckCircle, RiCheckboxCircleFill } from "react-icons/all";

function SidebarChat(props) {
  const {fndInfo,msgInfo} = props.friend;
  const myId = props.myId;

return (
    <>
    
   
          <div className='SidebarChat '>
      <Avatar src={fndInfo.google.avatar} />
<div className='sidebarChat__info'>
<h2 className='Fd_name'>{fndInfo.google.name}</h2>

<div className="msg-time">
                        {
                            msgInfo && msgInfo.senderId === myId ? <span>You: </span> : <span className={msgInfo?.senderId !== myId &&  msgInfo?.status !== undefined && msgInfo?.status !== 'seen'?'unseen_message':'' }>{' '}</span>

                        }
                        {
                            msgInfo && msgInfo.message.text ? <span className={msgInfo?.senderId !== myId &&  msgInfo?.status !== undefined && msgInfo?.status !== 'seen'?'unseen_message':'' }>{msgInfo.message.text.slice(0, 10)}</span> : msgInfo && msgInfo.message.image ? <span> send a image </span> : <span> connect you </span>
                        }

                        <span > {msgInfo ? moment(msgInfo.createdAt).startOf('mini').format('HH:mm') : moment(fndInfo.createdAt).startOf('mini').format('HH:mm')} </span>

                    </div>

                    {

myId === msgInfo?.senderId ?
    <div className="seen-unseen-icon">

        {
            msgInfo.status === 'seen' ?
            <img  style={{left:"120px",bottom:"30px"}} src={fndInfo.google.avatar}  /> : msgInfo.status === 'delivared' ? <div className="delivared"><RiCheckboxCircleFill /></div> : <div className='unseen'><HiOutlineCheckCircle /></div>
        }
    </div> :
    <div className="seen-unseen-icon">
        {
            msgInfo?.status !== undefined && msgInfo?.status !== 'seen' ? <div className="seen-icon">

      <Badge color="success" badgeContent={4} style={{left:"120px",bottom:"10px"}}>
  
      </Badge>
            </div> : ''
        }

    </div>
}

</div>

    </div>
         
    
  
    
    </>
    

   
  )
}

export default SidebarChat