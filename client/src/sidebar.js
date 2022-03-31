import React,{useState} from 'react'
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
const pages = ['Yeni grup', 'Çıkış'];
import Toolbar from '@mui/material/Toolbar';


function sidebar() {

  


  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
<Avatar src="https://joeschmoe.io/api/v1/random" />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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
        
    <SidebarChat />
  

        </div>
        
        </div>
  )
}

export default sidebar