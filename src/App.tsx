import React, { useEffect, useState } from 'react';
import "@fontsource/roboto";
import './App.scss';
import Hello from './assets/hello.png'
import {socket} from './socket'

import MessageInput from './components/messageInput/messageInput';
import MessageHistory from './components/messageHistory/messageHistory'
import ChatHeader from './components/chatheader/chatHeader';

//TODO 
// jakis system do utraconego/przerwanego połączenia (np. id w lockalstorage)
// style

const useWidget = () => {
  const [messages, setMessages] = useState([
    {id: 100, msg: "Witaj, w czym mogę pomóc?", isUser: false, timestamp: new Date().getTime().toString()},
  ])
  // have to use useEffect! If do not, socket.io send many times the same response 
  useEffect(()=>{
      socket.on('response', (msg:any) => {
      setMessages([...messages, {id: messages[messages.length-1].id+1, msg:msg, isUser:false, timestamp: new Date().getTime().toString()}])
      })
      return function cleanup() {socket.off('response')}
    },[messages]) // have to put 'messages' here, if not, component do not render imediatly //why??

  const send = (inputText: string) => {
    setMessages([...messages, {id: messages[messages.length-1].id+1, msg: inputText, isUser: true, timestamp: new Date().getTime().toString()}])
    socket.emit('message', inputText, socket.id) // it's possible to add others args and callback to handle 'recived' etc
  }

  return {messages, send}
}

function App() {
  const [openChat, setOpenChat] = useState(false)
  const {messages, send} =  useWidget()
  
  return (
    <div>
    {openChat?
    <div className='chat'>
      <ChatHeader />
      <MessageHistory messages={messages}/>
      <MessageInput send={send} />
    </div>:null
    }
    <div onClick={()=>setOpenChat(!openChat)} className='chat-wrapper'>
      <img className='chat-icon' src={Hello} alt="chatIcon"/>
    </div>
    </div>
  );
}

export default App;
