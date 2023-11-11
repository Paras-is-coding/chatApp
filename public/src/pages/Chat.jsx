import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts'

export default function Chat() {

  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

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
  },[])


  useEffect(()=>{
     const getContacts = async()=>{
      if(currentUser){
        try{
        // call API
        if(currentUser.isAvatarSet){
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data.result);
            console.log(contacts)
            console.log(data.data.result)
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



  return (
    <Container>
      <div className="container">
         {contacts.length > 0 ? (
            <Contacts contacts={contacts} currentUser={currentUser} />
                   ) : (
            <p>Loading contacts...</p>
          )}      
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