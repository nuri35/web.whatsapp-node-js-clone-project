import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux'
import {getMessage} from "./../store/action/messengerAction"
import {IconButton} from "@material-ui/core"

const StyledBadge = styled(Badge)(({ theme }) => ({
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

  
const ActiveFriend =  ({user,setCurrentFriend}) => {
    const dispatch = useDispatch()

  return (

      <IconButton onClick={()=>{
        setCurrentFriend({
            _id:user.userInfo.id,
            google:user.userInfo
  
        })
        dispatch(getMessage(user.userInfo.id))
      }}>

    <Stack direction="row" spacing={2}>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar  src={user.userInfo.avatar} />
    </StyledBadge>
    </Stack>
    </IconButton>
    )
}

export default ActiveFriend


