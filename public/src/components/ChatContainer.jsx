import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMsgRoute, sendMessageRoute } from '../utils/APIRoutes'
import { generateRandomString } from '../utils/helper'

export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messages,seMessages] = useState([]);
    const [arrivalMessage,setarrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(()=>{
        if(currentChat){
            const fetchChats = async()=>{
                const response = await axios.post(getAllMsgRoute,{
                    from: currentUser._id,
                    to: currentChat._id
                });
                seMessages(response.data);
            }
            fetchChats();
        }
    },[currentChat])


    const handleSendMsg = async(msg)=>{
       try {
        const {data} = await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })


        // emit "send-msg" event
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            messsage:msg
        });
        // update current messages array by pushing message sent by currentUser
        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg})
        seMessages(msgs)

       } catch (error) {
        console.log(error)        
       }
    };

    // runs when component loads, if we've socket.current we'll emit 'msg-receive' event
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setarrivalMessage({fromSelf:false,message:msg});
            })
        }
    },[]);

    // runs everytime new arrivalMessage is there and will add it to messages array
    useEffect(()=>{
        arrivalMessage && seMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])

    // for scrolling to view new messages 
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])


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
                            <div ref={scrollRef} key={generateRandomString()}>
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