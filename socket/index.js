
const { Server } = require("socket.io");
require('dotenv').config();
const io = new Server(process.env.SOCKET_PORT,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }


});



let users = [];

const addUser = (userId,socketId,userInfo) =>{
    
    const checkUser = users.some(u=>u.userId === userId);

    if(!checkUser){
        users.push({userId,socketId,userInfo});
    }
}

const userRemove = (socketId) =>{
  users = users.filter(u=>u.socketId !== socketId);
}


const findFriend = (id) =>{
  return users.find(u=>u.userId === id);
}

io.on('connection', (socket) => {

  console.log(socket.id + " socket running")

  socket.on("addUserLive", (userId, userInfo) => {
    
    addUser(userId,socket.id,userInfo);
    io.emit('getUser',users);

    const us = users.filter(u=>u.userId !== userId);
    const con = 'new_user_add';
    for(var i = 0 ; i<us.length ; i++){
        socket.to(us[i].socketId).emit('new_user_add',con)
    }

  });

  socket.on("sendMessage", (data) => {
    const user = findFriend(data.reseverId);
  
    if(user !== undefined){
     
        socket.to(user.socketId).emit('getMessage',data)
    }
   
  });

  socket.on('messageSeen',msg=>{
    const user = findFriend(msg.senderId);
    if(user !== undefined){
        socket.to(user.socketId).emit('msgSeenResponse',msg)
    }
})
socket.on('delivaredMessage',msg=>{
    const user = findFriend(msg.senderId);
    if(user !== undefined){
        socket.to(user.socketId).emit('msgDelivaredResponse',msg)
    }
})
socket.on('seen',data=>{
    
    const user = findFriend(data.senderId);
    if(user !== undefined){
        socket.to(user.socketId).emit('seenSuccess',data);
    }
})

  socket.on('typingMessage',(data)=>{

    const user = findFriend(data.reseverId);

    if(user !== undefined){
        
        socket.to(user.socketId).emit('typingMessageGet',{
            senderId : data.senderId,
            reseverId : data.reseverId,
            msg : data.msg
        })
    }
});
  

  socket.on('disconnect',()=>{
    console.log('user disconnect....');
    userRemove(socket.id);
    io.emit('getUser',users)
})

  });
