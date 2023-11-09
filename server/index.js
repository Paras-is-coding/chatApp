const http = require('http');
const app = require('./src/config/express.config.js');
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