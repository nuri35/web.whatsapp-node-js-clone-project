import React,{useState,useContext,useEffect,useRef} from 'react'
import "./Sidebar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,IconButton} from "@material-ui/core"
import SidebarChat from "./SidebarChat"
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chat from './Chat';
import Toolbar from '@mui/material/Toolbar';
import { AuthContext } from "./components/Context";
import ActiveFriend from "./components/ActiveFriend";
import { useDispatch, useSelector } from 'react-redux'
import {getFriends,getMessage,ImageMessageSend,seenMessage,updateMessage} from "./store/action/messengerAction"
import useSound from 'use-sound';
import moment from 'moment';
import messageSound from "./audio/audio_alert.mp3"
import { message as antMessage} from 'antd';
import io from "socket.io-client";

moment.locale("tr")


function sidebar() {


  const [notificationSPlay] = useSound(messageSound);
  
  const {user} = useContext(AuthContext)
const scrollRef = useRef()
const socket =  useRef()
  const {friends,message,messageSendSuccess,message_get_success,new_user_add} = useSelector(state=>state.messenger)
  
  const [currentFriend,setCurrentFriend] = useState(null)
  const [socketMessage,setSocketMessage] = useState("")
  const [typingMessage, setTypingMessage] = useState('')
  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const error = (value) => {
    antMessage.error(value);
  };
  
  const logoutHandle = async()=>{

    window.open("http://localhost:4000/auth/logout", "_self");
 

}


  const [activeUser, setActiveUser] = useState([]);

 useEffect(() => {
   socket.current = io.connect("http://localhost:6500")
   socket.current.on("getMessage",(data)=>{
    setSocketMessage(data)
  })
  socket.current.on("typingMessageGet",(data)=>{
    setTypingMessage(data)
  })
  socket.current.on("msgSeenResponse",(msg)=>{
    dispatch({
      type:"SEEN_MESSAGE",
      payload:{
        msgInfo:msg
      }
    })
  })
  socket.current.on('msgDelivaredResponse', msg => {
    dispatch({
        type: 'DELIVARED_MESSAGE',
        payload: {
            msgInfo: msg
        }
    })
})
socket.current.on('seenSuccess', data => {
    dispatch({
        type: 'SEEN_ALL',
        payload: data
    })
})
 }, [])

 useEffect(() => {

  socket.current.emit("addUserLive",user.id,user)

}, [])

useEffect(() => {
  socket.current.on("getUser",(users)=>{
    const filterUser = users.filter(u => u.userId !== user.id);
    setActiveUser(filterUser);
   
  })
socket.current.on("new_user_add",data=>{
  dispatch({
    type:"NEW_USER_ADD",
    payload:{
      new_user_add:data
    }
  })
})
}, [])


 useEffect(() => {
  if(socketMessage && currentFriend){
 
   
    if(socketMessage.senderId === currentFriend._id && socketMessage.reseverId === user.id ){

      dispatch({
        type :"SOCKET_MESSAGE",
        payload : {
            message : socketMessage
        }
    })
  
    dispatch(seenMessage(socketMessage));
    socket.current.emit('messageSeen', socketMessage);
    dispatch({
        type: 'UPDATE_FRIEND_MESSAGE',
        payload: {
            msgInfo: socketMessage,
            status: 'seen'
        }
    })

    }
 
  }
  setSocketMessage("")
}, [socketMessage])


useEffect(() => {
 
  if (socketMessage && socketMessage.senderId !== currentFriend._id && socketMessage.reseverId === user.id) {
    notificationSPlay();
 
    dispatch(updateMessage(socketMessage));
    socket.current.emit('delivaredMessage', socketMessage);
    dispatch({
        type: 'UPDATE_FRIEND_MESSAGE',
        payload: {
            msgInfo: socketMessage,
            status: 'delivared'
        }
    })
    
  }
}, [socketMessage])




const imageSend = async (e)=>{
  if (e.target.files.length === 1) {
    

   
    const data = new FormData()
   
    data.append("name", e.target.files[0].name);
    data.append("reseverId", currentFriend.google.id);
    data.append("file", e.target.files[0]);
  
  
  let dataState =  await dispatch(ImageMessageSend(data));


  socket.current.emit("sendMessage",({
    senderId:user.id,
    when:Date.now(),
    reseverId : currentFriend._id,
    message:{
      text: "",
      image: {content:dataState.message.message.image.content},
    
  },
  
  }))
 
      if(!dataState?.success){
        error(dataState?.message)
      }

}


    }

  useEffect(() => {
    dispatch(getFriends())
    dispatch({type : 'NEW_USER_ADD_CLEAR'})
  }, [new_user_add])


  
  const dispatch = useDispatch()

  useEffect(() => {
    if(messageSendSuccess){
      socket.current.emit("sendMessage",message[message.length-1])

      dispatch({
        type: 'UPDATE_FRIEND_MESSAGE',
        payload: {
            msgInfo: message[message.length - 1]
        }
    })
    dispatch({ type: 'MESSAGE_SEND_SUCCESS_CLEAR' })


    }
}, [messageSendSuccess])


  useEffect(() => {
    if(friends && friends.length > 0){
      setCurrentFriend(friends[0].fndInfo)
    }
  }, [friends])

  
  useEffect(() => {
    
    dispatch(getMessage(currentFriend?._id))

  }, [currentFriend?._id])


  useEffect(() => {
    if (message.length > 0) {
        if (message[message.length - 1].senderId !== user.id && message[message.length - 1].status !== 'seen') {
            dispatch({
                type: 'UPDATE',
                payload: {
                    id: currentFriend._id
                }
            })
            socket.current.emit('seen', { senderId: currentFriend._id, reseverId: user.id });
            dispatch(seenMessage({ _id: message[message.length - 1]._id }))
        }
    }
    dispatch({
        type: 'MESSAGE_GET_SUCCESS_CLEAR'
    })
}, [message_get_success])

  


      const search=async (e)=>{
        const getFriendClass = document.getElementsByClassName('hover-friend');
       
         const frienNameClass = document.getElementsByClassName('Fd_name');
      
        for (var i = 0; i < getFriendClass.length, i < frienNameClass.length; i++) {
            let text = frienNameClass[i].innerText.toLowerCase();
           
            if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                getFriendClass[i].style.display = '';
            } else {
                getFriendClass[i].style.display = 'none';
            }
        }
      }
    

    
      
 
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  
  return (
    <> 
    <div className='sidebar'>
        <div className='sidebar__header'>
        <IconButton >
            
        <Avatar src={user.avatar} />
       
              </IconButton>
             
      <div className='sidebar__headerRight'>

     

      
      <Toolbar disableGutters>
      <Box >
      <IconButton  
        onClick={handleOpenNavMenu}

         >
        <MoreVertIcon />
      </IconButton>
      <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
             
            >
              
              
                <MenuItem  onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={logoutHandle}>????k????</Typography>
                </MenuItem>
               
            </Menu>
            </Box>
            </Toolbar>
      </div>

        </div>
        <div className="active-friends">
                    {
   activeUser && activeUser.length > 0 ? activeUser.map(u => <ActiveFriend setCurrentFriend={setCurrentFriend} user={u} />) : ''
                  }
                        </div>
        <div className='sidebar__search'>
      <div className='sidebar__searchContainer'>

    <SearchOutlinedIcon fontSize='large'/>
    <input onChange={search} placeholder='Search ' type="text" />
      </div>

 

        </div>

        <div className='sidebar__chats'>
        {
        friends && friends.length > 0 ? friends.map(friend => 
          <div className='hover-friend' onClick={()=> {
            setCurrentFriend(friend.fndInfo) 
          }  }>
          <SidebarChat   myId={user.id}  friend={friend}  />
          </div>
          ) :
          <></>
      }
 
  

        </div>
        
        </div>
      
          <Chat  imageSend={imageSend} message={message}
           currentFriend={currentFriend} 
           scrollRef={scrollRef} 
           activeUser={activeUser}
           typingMessage={typingMessage} 

          />

       
    
    
        
          </>
  )
}

export default sidebar