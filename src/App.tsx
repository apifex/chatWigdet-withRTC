import React, { useEffect, useState } from 'react';
import "@fontsource/roboto";
import './App.scss';
import Hello from './assets/hello.png'
import {socket} from './socket'
import Cookies from 'js-cookie'
import MessageInput from './components/messageInput/messageInput';
import MessageHistory from './components/messageHistory/messageHistory'
import ChatHeader from './components/chatheader/chatHeader';

//TODO 
// jakis system do utraconego/przerwanego połączenia (np. id w lockalstorage)
// style >> responsywnosc
// timestampy we wiadomosciach
// zamkanie okienka czatu, ktore konczy polaczenie

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
    socket.emit('message', inputText, socket.id)
    // it's possible to add others args and callback to handle 'recived' etc
  }
 return {messages, send}
}

function App() {
const [response, setResponse] = useState('dd')

  const [openChat, setOpenChat] = useState(false)
  const {messages, send} =  useWidget()

useEffect(()=>{
  const check = async () => {
    try{
        const body = {
          name: 'bla',
          steps: 'fsd'
        }

        const bodyUser = {
          userName: 'apifex2',
          email: 'apifex2@onet.gt',
          password: 'costam'
        }
        const response = await fetch ('http://msf-server.azurewebsites.net/api/user/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                                body: JSON.stringify(bodyUser)}).then((res)=>res.json())
                    
       console.log(response)
        
    } catch (err) {
        console.log("error when calling checkCalendar", err)
    }
  
}
check()

},[])

console.log(response)

  return (
    <div>
      <div></div>
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
    </div>
  );
}

export default App;
