import React, { useState,useEffect,useRef ,useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Chat.css"
import "./message.scss"
import MicIcon from '@mui/icons-material/Mic';
import AttachFile from '@mui/icons-material/AttachFile';
import {Avatar,IconButton} from "@material-ui/core"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Image,Space,Input, Typography} from 'antd';
import Picker from 'emoji-picker-react';
import {FileFilled,DownCircleFilled} from "@ant-design/icons"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import io from "socket.io-client";
import moment from 'moment';
import styled from "styled-components";
import { styled as styl } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {messageSend} from "./store/action/messengerAction"
import { AuthContext } from "./components/Context";
import axios from "axios"
import fileDownload from 'js-file-download'
moment.locale("tr")


const StyledBadge = styl(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatPlaceholder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;
const Placeholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);
  span {
    font-size: 32px;
    color: #525252;
  }
`;

const InputDıv = styled('input')({
  display: 'none',
});

function Chat(props) {
  const dispatch = useDispatch()

  const {user} = useContext(AuthContext)
  const socket =  useRef()



 useEffect(() => {
   socket.current = io.connect("http://localhost:6500")

 }, [])


 


const [input,setInput] = useState("")
const [showEmoji,setShowEmoji] = useState(false)

const [anchorElNav, setAnchorElNav] = useState(null);



const onEmojiClick = (event, emojiObject) => {


  setInput(input.concat(emojiObject.emoji))
};


  const sendMessage = (e)=>{
   

    if(transcript){
      const count = (transcript.match(/mesajı ilet/g) || []).length;

    
      for (let i = 0; i < count; i++) {
       var messContent =   transcript.replace(/mesajı ilet/g,"");
       
      }

      const dataSend = {
        senderId:user.id,
        SenderUser :user.name,
        reseverId : props.currentFriend._id,
        messageContent : messContent
      }
    
      socket.current.emit("sendMessage",({
        senderId:user.id,
        when:Date.now(),
        reseverId :props.currentFriend._id,
        message:{
          text: messContent,
          file:"",
          image:""
      },
      
      }))

      dispatch(messageSend(dataSend))
  
        setInput("")


    }else{
      e.preventDefault();
      const dataSend = {
        senderId:user.id,
        SenderUser :user.name,
        reseverId : props.currentFriend._id,
        messageContent : input?input: "❤️"
      }

      socket.current.emit("sendMessage",({
        senderId:user.id,
        when:Date.now(),
        reseverId : props.currentFriend._id,
        message:{
          text: input?input: "❤️",
          file:"",
          image:""
      },
      
      }))

      socket.current.emit('typingMessage', {
        senderId: user.id,
        reseverId: props.currentFriend._id,
        msg: ""
    })
    
      dispatch(messageSend(dataSend))
  
        setInput("")
    }
     
    
  
    
  }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  const clickEmoji = (e)=>{
    e.preventDefault();
    setShowEmoji(!showEmoji)
  }





const commands = [
  {
    command: ["mesajı ilet"],
    callback: () => {
      sendMessage()
      SpeechRecognition.stopListening()
      resetTranscript()
    },
    
    
  },

  {
    command: 'mesajı sil',
    callback: () => {
      resetTranscript()
    },
    
    
  },


]



let { transcript,resetTranscript } = useSpeechRecognition({commands})

const speaking = ()=>{

  const ctx = new(window.AudioContext || window.webkitAudioContext)()
  const osc  = ctx.createOscillator()
  
  osc.connect(ctx.destination);
  osc.start(0)
  osc.stop(2)
  
  SpeechRecognition.startListening({language:"tr",continuous:true})

  
}


  return (

    <> 
  {
    props.currentFriend == null ? 
    
    <Placeholder>
    <ChatPlaceholder src={'/images/welcome-placeholder.jpeg'} />
    <span>Keep your phone connected</span>
    WhatsApp connects to your phone to sync messages.
  </Placeholder>
    :
    <div className='chat'>
    <div className='chat__header'>
    
   
    
      {
 props.activeUser && props.activeUser.length > 0 && props.activeUser.some(u => u.userId === props.currentFriend._id) ? 
 <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar src={ props.currentFriend.google.avatar} />
      </StyledBadge>
      
  :
  <Avatar src={ props.currentFriend.google.avatar} />
    }
  
 
       
 <div className='chat__headerInfo'>
 <h3>{props.currentFriend.google.name}</h3>
 {
   props.activeUser && props.activeUser.length > 0 && props.activeUser.some(u => u.userId === props.currentFriend._id) ? 
   <p>Active</p>
   :
   ""
 }

 </div>
      
  

    <div className='chat__headerLeft'>
     
           
      </div>
      </div>

     

      <div className='chat__body'>

      {
props.message && props.message.length > 0 ? props.message.map(m=>
        m.senderId === user.id ?  <p ref={props.scrollRef} className='chat__message chat__receiver'>
 
 { m.message.text === ""  ? 
   
  
     <Space size={12}>
     <Image
       width={200}
       src={`data:${m.message.image.contentType};base64,` +   m.message.image.content}
      
     />
   
   </Space> 
     
    :
     m.message.text

    

     }

  
    
      <span className='chat__timestamp'>
         
      {moment(m.when).startOf('mini').fromNow()}
          </span>
        </p>
        : 

        <p ref={props.scrollRef} className='chat__message '>

          { m.message.text === ""   ? 
     <Space size={12}>
     <Image
       width={200}
       src={`data:${m.message.image.contentType};base64,` +   m.message.image.content}
     
     />
   
   </Space> 
    
    :
     m.message.text

     }
  
      
        <span className='chat__timestamp'>
        {moment(m.when).startOf('mini').fromNow()}
       
            </span>
          </p>

):""
     

        }
  {
                props.typingMessage && props.typingMessage.msg && props.typingMessage.senderId === props.currentFriend._id ?
                 <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                        <IconButton >
            
                        <Avatar src={props.currentFriend.google.avatar} />
           
                           </IconButton>
                          
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className='chat__message'>Typing message....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 :
                  ''
            }
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
    <label htmlFor="icon-button-file">
        <InputDıv name='file' onChange={props.imageSend}  id="icon-button-file" type="file"  />
        <IconButton  aria-label="upload picture" component="span">
          <AttachFile />
        </IconButton>
      </label>
   


  
    
    {
      transcript ?  
      <form>
      <Input  value={transcript}  name="voiceAssistan" placeholder='Type a message ' type="text"  />
    
    </form>
:
<form>
<Input value={input} onChange={(e) => {
  setInput(e.target.value)
  socket.current.emit('typingMessage', {
    senderId: user.id,
    reseverId: props.currentFriend._id,
    msg: e.target.value
})
}} placeholder='Type a message ' type="text"      />
     <button onClick={sendMessage} type='submit'>
   
     </button>
     </form>
    }
   

  
    

    <IconButton onClick={speaking} >
    <MicIcon />
    </IconButton>

   
   
      </div>
   
     
     
    
   
      </div>

  }

   
        </>
  )
}

export default Chat


