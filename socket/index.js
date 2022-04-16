
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

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  


const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };



io.on('connection', (socket) => {
 
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
      });
    
      //send and get message
      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        // const user = getUser(receiverId);
        
        io.emit("getMessage", {
          senderId,
          text,
        });
      });


  socket.on("disconnect", () => {
    console.log("a user disconnected! " + socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  });
