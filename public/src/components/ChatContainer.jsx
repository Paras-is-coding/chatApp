import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMsgRoute, sendMessageRoute } from '../utils/APIRoutes'

export default function ChatContainer({currentChat,currentUser}) {
    const [messages,seMessages] = useState([]);

    useEffect(()=>{
        const fetchChats = async()=>{
            const response = await axios.post(getAllMsgRoute,{
                from: currentUser._id,
                to: currentChat._id
            });
            seMessages(response.data);
        }
        fetchChats();
    },[currentChat])


    const handleSendMsg = async(msg)=>{
       try {
        const {data} = await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        console.log(data)
       } catch (error) {
        console.log(error)        
       }
    }
  return (
   <>
   {
    currentChat && (
        <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img 
                src={`data:image/svg+xml;base64, ${currentChat.avatar}`}
                 alt="avatar"
                 />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout/>
        </div>


        <div className="chat-messages">
            {
                messages.map((message)=>{
                        return(
                            <div>
                                <div className={`message ${message.fromSelf ?"sended":"received"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
    )
   }
   </>
  )
}




const Container = styled.div`
padding:1.2rem;
display:grid;
gap:0.1rem;
overflow:hidden;
grid-template-rows: 10% 78% 12%;

@media screen and (min-width:720px) and (max-width:1080px){
    grid-template-rows:15% 70% 15%;
}
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details{
        display:flex;
        align-items:center;
        gap:1rem;
        .avatar{
            img{
                height:3rem;
            }
        }
        .username{
            h3{
                color:white;
            }
        }
    }
}

.chat-messages{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
    .message{
        display:flex;
        align=items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.2rem;
            border-radius:1rem;
            color:#d1d1d1;
        }
    }
    
    .sended{
        justify-content:flex-end;
        .content{
            background-color:#4f04ff21;
        }
    }
    .received{
        justify-content:flex-start;
        .content{
            background-color:#9900ff20;
        }
    }
}
`