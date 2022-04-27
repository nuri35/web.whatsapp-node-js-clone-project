
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

io.on('connection', (socket) => {

  console.log(socket.id + " socket running")

  socket.on("addUserLive", (userId, userInfo) => {
    addUser(userId,socket.id,userInfo);
    io.emit('getUser',users);
  
   
  });
  
 
  socket.on('disconnect',()=>{
    console.log('user disconnect....');
    userRemove(socket.id);
    io.emit('getUser',users)
})

  });
