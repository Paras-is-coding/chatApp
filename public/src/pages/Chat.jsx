import styled from 'styled-components'
import React, { useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

// socket 
import {io} from 'socket.io-client'

export default function Chat() {

  // socket ref
  const socket = useRef();

  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const [currentChat,setCurrentChat] = useState(undefined)


  useEffect(()=>{
      const userCheck = async ()=>{
        if(!localStorage.getItem('chat-app-user')){
          navigate('/login');
      }else{
          const localStorageUser = await JSON.parse(localStorage.getItem("chat-app-user"))
          setCurrentUser(localStorageUser)
        }
      }
      userCheck()
  },[]);

  // after having currentUser, establish socket connection and emit "add-user"
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }

  },[currentUser]);


  useEffect(()=>{
     const getContacts = async()=>{
      if(currentUser){
        try{
        // call API
        if(currentUser.isAvatarSet){
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data.result);
        }else{
            navigate('/setAvatar')
        }
      }catch(error){
        console.log('Error fetching contacts:',error)
      }
    }
     }

     getContacts()
  },[currentUser])


  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }


  return (
    <Container>
      <div className="container">
         {contacts.length > 0 ? (
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                   ) : (
            <p>Loading contacts...</p>
          )}

          {
            (currentChat === undefined)?
            (currentUser && (<Welcome currentUser={currentUser}/> )) :
            // pass socket ref to ChatContainer
            (currentUser && (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>))
          }     
      </div>
    </Container>
  )
}



const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:1rem;
background-color:#131324;
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%;
  }
}



`