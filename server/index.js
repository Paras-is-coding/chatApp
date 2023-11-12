const http = require('http');
const app = require('./src/config/express.config.js');

// import socket
const socket = require('socket.io');

require('dotenv').config()

// creating node server we'll mount express App here
const server = http.createServer(app);




// listen to server
server.listen(process.env.PORT,process.env.HOST,(err)=>{
    if(!err){
        console.log(`Server is running at port ${process.env.PORT}`)
        console.log("Press Ctrl+C to disconnect your server")
        console.log(`Use http://${process.env.HOST}/${process.env.PORT}/ to browse your server` )
    }
})


// create io after creating server
const io = socket(server,{
    cors:{
        origin:"*",
        credentials:true     
    }
});

// we'll store all our online users inside this Map 
global.onlineUsers = new Map();

io.on("connection",(socket)=>{

    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.msg);
        }
    })


});