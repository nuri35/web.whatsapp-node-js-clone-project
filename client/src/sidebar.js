import React,{useState,useContext,useEffect,useRef} from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
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
import { useDispatch, useSelector } from 'react-redux'
import {getFriends,getMessage,ImageMessageSend} from "./store/action/messengerAction"
import useSound from 'use-sound';
import sendingSound from './audio/frontend_src_audio_sending.mp3';

function sidebar() {
  const dispatch = useDispatch()
  const [sendingSPlay] = useSound(sendingSound);
  const {user} = useContext(AuthContext)
const scrollRef = useRef()
  const {friends,message} = useSelector(state=>state.messenger)
  
  const [currentFriend,setCurrentFriend] = useState(null)

  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  
  const logoutHandle = async()=>{

    window.open("http://localhost:4000/auth/logout", "_self");
 

}

  useEffect(() => {
    dispatch(getFriends())
  }, [])

  
  const imageSend = (e)=>{
    if (e.target.files.length !== 0) {
      sendingSPlay();
      const imagename = e.target.files[0].name;
   
      const newImageName = Date.now() + imagename;

      const formData = {
        senderId:user.id,
        imageName: newImageName,
        reseverId:currentFriend.google.id,
        image:e.target.files[0]
      }
      console.log(e.target.files)
      dispatch(ImageMessageSend(formData));

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

      <IconButton>
        <ChatIcon />
      </IconButton>

      
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

        <div className='sidebar__search'>
      <div className='sidebar__searchContainer'>

    <SearchOutlinedIcon fontSize='large'/>
    <input placeholder='Search ' type="text" />
      </div>

        </div>

        <div className='sidebar__chats'>
        {
        friends && friends.length > 0 ? friends.map(friend => 
          <div onClick={()=> {
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
      
          <Chat imageSend={imageSend} message={message} currentFriend={currentFriend} scrollRef={scrollRef}/>

       
    
    
        
          </>
  )
}

export default sidebar