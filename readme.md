# setup for chat app 
- public/
    - npm create vite@latest
    - cleanup
- server/
    - npm init
    - npm i express mongoose nodemon socket.io bcrypt cors dotenv ->install dependencies
    - index.js ->create file
    - package.json/"start":"nodemon index.js" ->start 
    
# create node server and express app
- index.js -> node server using 'http' and listen
- src/express.config.js -> express app using 'express'


# Controlling CORS from server, env and mongoose setup
- exprss.config.js/ 
    - allowed all domains using 'cors'
    - connected to DB using 'mongoose'
- set up .env to store sensitive data(MONGODB_URL,HOST,etc)

