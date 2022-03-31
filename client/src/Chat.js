import React, { useState } from 'react'
import "./Chat.css"
import MicIcon from '@mui/icons-material/Mic';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,IconButton} from "@material-ui/core"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';


function Chat() {
const [input,setInput] = useState("")

  const sendMessage = (e)=>{
    e.preventDefault();
    console.log(input)
    setInput("")
  }


  return (
    <div className='chat'>
      <div className='chat__header'>
      <Avatar src="https://joeschmoe.io/api/v1/random" />

      <div className='chat__headerInfo'>
      <h3>Sude adıvar</h3>
      <p>last seen at ...</p>
      </div>

      <div className='chat__headerRight'>
     
    
      <IconButton>
        <MoreVertIcon />
      </IconButton>
      </div>

        </div>

        <div className='chat__body'>
          <p className='chat__message'>

           
            this is a message yeahh
            <span className='chat__timestamp'>
              
            3.52pm
            </span>
          </p>

          <p className='chat__message chat__receiver'>

this is a message yeahh
<span className='chat__timestamp'>
  
3.52pm
</span>
</p>


<p className='chat__message chat__receiver'>


this is a message yeahh
<span className='chat__timestamp'>
  
3.52pm
</span>
</p>




<p className='chat__message'>

this is a message yeahh
<span className='chat__timestamp'>
  
5.12pm
</span>
</p>


        </div>

        <div className='chat__footer'>
        <IconButton>
        <InsertEmoticonIcon />
      </IconButton>
      <IconButton>
        <AttachFile />
      </IconButton>
      <form>

      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message ' type="text" />
      <button onClick={sendMessage} type='submit'>
      <IconButton>
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