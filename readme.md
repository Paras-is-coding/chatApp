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

# setting up frontend part, public/ 
- installing dependencies
    - npm i axios styled-components react-router-dom
- public/src/
    - pages/ Register.jsx,Login.jsx,Chat.jsx
    - components/
    - utils/
- set up react router
    - Inside app.jsx ,wrap app with BrowserRouter and Routes > creates Route for each page


# Creating Register Functionality
* creating frontend design and calling API onSubmit 

- using styled from 'styled-components' 
    - create FormContainer = styled.div'<here we add styling almost like css>'
    - wrap register component with this container to apply css
- add onChange and onSubmit on the form 
    - create handleChange, setValues of form inputs in a state
    - handleValidation, validate and show message(toast)-> npm i react-toastify
    - handleSubmit, if handleValidation return true we'll call our API 
- index.css ->used Josefin Sans Google fonts and some basic styling

- utils/APIRoutes.js  ->define our API routes

* creating API for handling '/register'

- src/app/controllers,routers,models,services & src/router
- create userModel/Controller/Router.js files
- userController/ register middleware ->store data using UserModel 
    - use bcrypt.js for password enc
- Now in resigter page
    - if response.status != 200 toast error message
    - otherwise clear form, save user to localhost and navigate to '/' chat page



# Creating login functionality
- Copy paste register page to login and make some changes
- create API in backend for login route
    - make login controller and route
    - check for username and match password using bcrypt if user exist
    - send user as resoponse removing password

- IF there is user in local storage redirect user to chat page
    - Create useEffect(()=>{},[]) inside login and register page 
    - Here we just checked if there is 'chat-app-user' in localstorage,If so redirected to chat page


# Creating the avatar functionality
- create page SetAvatar.jsx 
    - const api = "https://api.multiavatar.com/45678945"  ->api that gives us random avatar when we pass random number
    - const Container = styled.div`<write css here>`  ->and wrap component with <Container></Container>
    - npm i buffer  ->for storing image.data in form of  base64 string in array
    - Now images are fetched display using avatars.map() and apply CSS to the page

    - setProfilePicture = () =>{}
        - see if selectedAvatar is not undefined set error if so 
        - else get user from localstorage and call setAvatarRoute with user._id and payload image:avatars[selectedAvatar]

- backend
    - create route for '/setAvatar/:id'
    - create setAvatar controller

- also use useEffect() to navigate to login if there's no 'chat-app-user' in localstorage


# Begin our chat section
* Design Chat.jsx page
    - wrap page with <Container></Container> using styled.div``
    - inside that make div.container, style both of them
 
    - In Chat.jsx
        - If there's user in localstorage,
        - fetch contacts for DB, for that make route and API
        - Else navigate to login page
    - make Contacts.jsx component
        - Call that in Chat.jsx page passing contacts and currentUser props
        - user useEffect to change currentUser att. while change in currentUser
        - display logo&appname, contacts and currentUser


* select user in chats functionality
    - Chat.jsx
        - create currentChat state
        - make handleChatChange function > setCurrentChat(chat)
        - pass this fn as prop to Contacts.jsx
    - Contacts.jsx
        - add functionality to changeCurrentChat > setCurrentSelected(index);changeChat(contact)
        - call the function add on user/contact  onClick

* Display welcome component if no user selected otherwise we'll display chats later
    - components/Welcome.jsx
    - we'll pass currentUser from the Chat.jsx



# Creating chat container component
- components/ChatContainer.jsx
- Chat.jsx/ if currentChat is undefined render Welcome compo Else render ChatContainer
- ChatContainer.jsx ->We'll have three sections here, header chatmessages and chatinput
    * Main logic of our chat application will come here.... 
- header contains chatUser avatar,name and on rightside logout component
    - Creating Logout.jsx component
        - install react icons
        - import useNavigate, styled, BiPowerOff 
        - onClick to logout button we'll clear localStorage and navigate to login

# Creating ChatInput component for ChatContainer component
- Mount the component to ChatContainer & pass handleSendMessage function as prop
- ChatInput 
    - import styled
    - npm i emoji-picker-react > import Picker
    - import IoMdSend and BsEmojiSmileFill react-icons
    * NOW style the component

    - EMOJI PICKER functionality
        - create boolean state showEmojiPicker
        - create handleEmojiPickerHideShow function ->reverse value of showEmojiPicker
        - onClick on smileemoji call the function AND below that conditionally show <Picker onEmojiClick={handleEmojiClick}/>
            - In this function append emoji.emoji to msg

    - MESSAGE functionality
        - create string state msg
        - set onChange in input to setMsg 

    - Send functionality 
        - onClick to send button sendChat fn called 
        - that fn will call handleSendMessage(msg) ie fn came as prop

* Sending the message to backend, we'll implement socket later
- models/messageModel.js ->message.text, users, sender
- routes/messageRouter.js ->
- controller/messageController.js -> addMessage,getAllMessage
- services/messageService.js

- AFTER API to addmsg is completed we'll inegrate it to frontend
    - utils/APiRoutes.js/ sendMessageRoute
    - also pass currentUser from Chat.jsx to ChatContainer.jsx

