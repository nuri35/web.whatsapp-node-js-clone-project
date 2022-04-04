import React, { useState,useEffect,useRef } from 'react'
import "./Chat.css"
import MicIcon from '@mui/icons-material/Mic';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,IconButton} from "@material-ui/core"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import Toolbar from '@mui/material/Toolbar';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Photo from '@mui/icons-material/Photo';
import io from "socket.io-client";
import moment from 'moment';
moment.locale("tr")


const user = {
  id:1234
}

function Chat() {
 
 
  const [currentChat, setCurrentChat] = useState(null);
 const socket =  useRef(io.connect("http://localhost:6500"))
const [input,setInput] = useState("")
const [chosenEmoji, setChosenEmoji] = useState(null);
const [showEmoji,setShowEmoji] = useState(false)
const [messages, setMessages] = useState([]);

const actions = [
  { icon: <FileCopyIcon />, name: 'Belge' },
  { icon: <Photo />, name: 'Fotograflar' },
 
];


useEffect(() => {
   
  socket.current.on("getMessage", (data) => {
   
  data.createdAt =  Date.now()
    setMessages((prev) => [...prev, data]);
  });
}, []);



  useEffect(() => {

    socket.current.emit("addUser",user.id)
    socket.current.on("getUsers",(data)=>{
      console.log(data)

    })
   
   }, [user])
   

const onEmojiClick = (event, emojiObject) => {
 

  setInput(input.concat(emojiObject.emoji))
};

  const sendMessage = (e)=>{
    e.preventDefault();

    // const receiverId = currentChat.members.find(
    //   (member) => member !== user.id
    // ); sımdılık herkese yollattır daha sonra redıse kaydederek ordan anlıcaz kıme yollattımızı

  
    socket.current.emit("sendMessage", {
      senderId: user.id,
      // receiverId,
      text: input,
    });

    
    setInput("")
  }




  const clickEmoji = (e)=>{
    e.preventDefault();
    setShowEmoji(!showEmoji)
  }
 


  return (
    <div className='chat'>
      <div className='chat__header'>
      <Avatar src="https://joeschmoe.io/api/v1/random" />

      <div className='chat__headerInfo'>
      <h3>Sude adıvar</h3>
      <p>last seen at ...</p>
      </div>

        </div>

        <div className='chat__body'>
          
          <div>
        {messages.map((messageContent) => {
          return (
            <p className='chat__message chat__receiver'>

           {messageContent?.text}
            <span className='chat__timestamp'>
            {moment(messageContent?.createdAt, "h:mm").format('h:mm')}
           
            </span>
          </p>

          );
        })}
         </div>
    
         
       

        </div>
       
        {showEmoji ? 
       <Picker 
       onEmojiClick={onEmojiClick} 
       pickerStyle={{ width: '100%' }}
    
       />
       
        :
        <></>
    }
    
        <div className='chat__footer'>
      
        <IconButton 
        onClick={clickEmoji}
       
        >
        <InsertEmoticonIcon />
      </IconButton>

     
    
      
      <Box sx={{ transform: 'translateZ(0px)' }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: -10, right:75 }}
        icon={<AttachFile />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>

      <form>

      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message ' type="text" />
      <button onClick={sendMessage} type='submit'>
      <IconButton >
      <SendIcon />
      </IconButton>
       
      </button>
      </form>
      <IconButton>
      <MicIcon />
      </IconButton>

     
        </div>
        
        </div>
  )
}

export default Chat


