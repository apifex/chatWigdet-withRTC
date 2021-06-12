import { useEffect, useRef } from "react"

interface IProps {
    messages: IMessage[]
}

const MessageHistory = ({messages}:IProps) => {

    const messageRef = useRef<HTMLDivElement>(null)  
    
    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.addEventListener('DOMNodeInserted', (event):void => {
            //@ts-ignore
            event.target?.scrollIntoView() // ??!! typescirpt
          });
        }
      }, [])

    return (
        <div className='messages' ref={messageRef}>
        {messages.map((message:IMessage)=>
        message.isUser?
        <div key={message.id}
             id={message.msg}
             className='message message-personal new'>
             {message.msg}
        </div>
        :
        <div key={message.id} 
             className='message new'>
             {message.msg}
        
        </div>
        )
        }
        </div>
    )
}

export default MessageHistory