import './messageHistory.style.scss'

interface IProps {
    messages: IMessage[]
}

const MessageHistory = ({messages}:IProps) => {
    
    return (
        <div className='message-history'>
        {messages.map((message:IMessage)=>
        message.me?
        <div key={Math.random()} className='message me'>{message.text}</div>:
        <div key={Math.random()} className='message other'>{message.text}</div>)}
        </div>
    
    )
}

export default MessageHistory