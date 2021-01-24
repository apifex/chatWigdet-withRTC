import {useState} from 'react'
import './messageInput.style.scss'

interface IProps {
    send(inputText: string): void;
}

const MessageInput = ({send}:IProps) => {

    const [inputText, setInputText] = useState('')
    const handleInput = (e: any) => setInputText(e.target.value)
    const handleSend = () => {
        send(inputText)
        setInputText('')
    }

    return (
        <div>
            <input className="message-input" onChange={handleInput} value={inputText} type="text" />
            <button onClick={handleSend}>send</button>
        </div>
    )
}

export default MessageInput