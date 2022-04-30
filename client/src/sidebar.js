import React,{useState,useContext,useEffect,useRef} from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AvatarGroup from '@mui/material/AvatarGroup';
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
import {getFriends,getMessage,ImageMessageSend} from "./store/action/messengerAction"
import useSound from 'use-sound';
import moment from 'moment';
import sendingSound from './audio/frontend_src_audio_sending.mp3';
import { message as antMessage} from 'antd';
import io from "socket.io-client";
import path from "path"
moment.locale("tr")


function sidebar() {
  const dispatch = useDispatch()
  const [sendingSPlay] = useSound(sendingSound);
  const {user} = useContext(AuthContext)
const scrollRef = useRef()
const socket =  useRef()
  const {friends,message} = useSelector(state=>state.messenger)
  
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

  const [activeUser, setActiveUser] = useState([]);

 useEffect(() => {
   socket.current = io.connect("http://localhost:6500")
 
 }, [])

 useEffect(() => {

  socket.current.emit("addUserLive",user.id,user)

}, [])

useEffect(() => {
  socket.current.on("getUser",(users)=>{
    const filterUser = users.filter(u => u.userId !== user.id);
    setActiveUser(filterUser);
   
  })

}, [])

useEffect(() => {
  
  socket.current.on("getMessage",(data)=>{
    setSocketMessage(data)
  })
 }, [])

 useEffect(() => {
  
  socket.current.on("typingMessageGet",(data)=>{
    setTypingMessage(data)
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
    }

  }
  setSocketMessage("")
}, [socketMessage])


  const error = (value) => {
    antMessage.error(value);
  };
  
  const logoutHandle = async()=>{

    window.open("http://localhost:4000/auth/logout", "_self");
 

}

  useEffect(() => {
    dispatch(getFriends())
  }, [])




  const imageSend = async (e)=>{
    if (e.target.files.length === 1) {
      sendingSPlay();

     
      const data = new FormData()
     
      data.append("senderId", user.id);
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
                  <Typography textAlign="center">Yeni grup</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={logoutHandle}>Çıkış</Typography>
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
            setCurrentFriend(friend) 
            dispatch(getMessage(friend.google.id))
          }  }>
          <SidebarChat friend={friend}  />
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