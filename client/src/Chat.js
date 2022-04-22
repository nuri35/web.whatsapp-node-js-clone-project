import React, { useState,useEffect,useRef ,useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Chat.css"
import MicIcon from '@mui/icons-material/Mic';
import AttachFile from '@mui/icons-material/AttachFile';
import {Avatar,IconButton} from "@material-ui/core"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Image,Space,Input} from 'antd';

import Picker from 'emoji-picker-react';
import {FileFilled,DownCircleFilled} from "@ant-design/icons"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// import io from "socket.io-client";
import moment from 'moment';
import styled from "styled-components";
import {messageSend} from "./store/action/messengerAction"
import { AuthContext } from "./components/Context";
import axios from "axios"
import fileDownload from 'js-file-download'
moment.locale("tr")


const user = {
  id:1234
}



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
//  const socket =  useRef(io.connect("http://localhost:6500"))
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
       var messContent =   transcript.replace(/mesajı ilet/i,"");
       
      }


      const dataSend = {
        senderId:user.id,
        SenderUser :user.name,
        reseverId : props.currentFriend.google.id,
        messageContent : transcript?messContent: "❤️"
      }
    
      dispatch(messageSend(dataSend))
  
        setInput("")


    }else{
      e.preventDefault();
      const dataSend = {
        senderId:user.id,
        SenderUser :user.name,
        reseverId : props.currentFriend.google.id,
        messageContent : input?input: "❤️"
      }
    
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


const download = (value)=>{
  const data = {
    whichFile:value,
    whoReseverId:props.currentFriend.google.id
    
  }
  axios({
    url:`http://localhost:4000/download`,
    method:"POST",
    responseType:"blob",
    data,
    withCredentials:true
  }).then((res)=>{
  fileDownload(res.data,`${value}`)
  }).catch((err) =>{
    console.log(err)
  })
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
    
    <Avatar src={ props.currentFriend.google.avatar} />

    <div className='chat__headerInfo'>
    <h3>{props.currentFriend.google.name}</h3>
    <p>last seen at one hours</p>
    </div>

    <div className='chat__headerLeft'>
     
           
      </div>
      </div>

     

      <div className='chat__body'>

      {
props.message && props.message.length > 0 ? props.message.map(m=>
        m.senderId === user.id ?  <p ref={props.scrollRef} className='chat__message chat__receiver'>
 
 { m.message.text === "" && m.message.file === ""  ? 
     <Space size={12}>
     <Image
       width={200}
       src={`http://localhost:4000/files/${m.message.image}`}
     
     />
   
   </Space> 
     
     : m.message.text === "" && m.message.image === "" ?
        <div>   
 <span style={{ padding:"10px" }}>
 <FileFilled style={{ fontSize: '24px' }}/>
 </span>

 <span>
   {m.message.file}

 </span>
 <span onClick={()=>{
  
  download(m.message.file)
 }} >
 <IconButton 
     
     
      >
      <DownCircleFilled />
    </IconButton>
 </span>
          </div> 
    :
     m.message.text

     }
  
      

    
      <span className='chat__timestamp'>
         
      {moment(m.when).startOf('mini').fromNow()}
          </span>
        </p>
        : 

        <p ref={props.scrollRef} className='chat__message '>
          { m.message.text === "" && m.message.file === ""  ? 
     <Space size={12}>
     <Image
       width={200}
       src={`http://localhost:4000/files/${m.message.image}`}
     
     />
   
   </Space> 
     
     : m.message.text === "" && m.message.image === "" ?
        <div>   
 <span style={{ padding:"10px" }}>
 <FileFilled style={{ fontSize: '24px' }}/>
 </span>

 <span>
   {m.message.file}

 </span>
 <span  onClick={async ()=>{
   setCurrentFile(m.message.file)
   dowloandFile()
 }} >
 <IconButton 
     
     
      >
      <DownCircleFilled />
    </IconButton>
 </span>
          </div> 
    :
     m.message.text

     }
  
      
        <span className='chat__timestamp'>
        {moment(m.when).startOf('mini').fromNow()}
       
            </span>
          </p>

):""
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
<Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message ' type="text"      />
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


