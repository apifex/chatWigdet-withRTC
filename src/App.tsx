import React, { useEffect, useState } from 'react';
import './App.scss';
import {socket} from './socket'

import MessageInput from './components/messageInput/messageInput';
import MessageHistory from './components/messageHistory/messageHistory'
import ChatHeader from './components/chatheader/chatHeader';

//TODO 
// connect to db
// prepare ID system
// styles


const messagesdb: IMessage[] = [
  {text: "hello", me: true}, 
  {text: "no czesc", me: false},
  {text: "jak sie masz", me: true},
]

const myid = 'pawel'

const useAppLogic = () => {
  const [messages, setMessages] = useState(messagesdb)
// have to use useEffect! If do not, socket.io send many times the same response 
useEffect(()=>{
    socket.on('response', (msg:any) => {
    setMessages([{text:msg, me:false}, ...messages])
    })
    return function cleanup() {socket.off('response')}
},[messages]) // have to put 'messages' here, if not, component do not render imediatly //why??

const send = (inputText: string) => {
    setMessages([{text: inputText, me: true}, ...messages])
    socket.emit('message', inputText, myid) // it's possible to add others args and callback to handle 'recived' etc
  }
  return {messages, send}
}

function App() {
  
  const {messages, send} =  useAppLogic()

  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageHistory messages={messages}/>
      <MessageInput send={send} />
    </div>
  );
}

export default App;
