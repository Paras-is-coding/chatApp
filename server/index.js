const http = require('http');
const app = require('./src/config/express.config');

// creating node server we'll mount express App here
const server = http.createServer(app);



// listen to server
server.listen('3000','localhost',(err)=>{
    if(!err){
        console.log("Server is running at port 3000")
        console.log("Press Ctrl+C to disconnect your server")
        console.log("Use http://loacalhost:3000/ to browse your server" )
    }
})