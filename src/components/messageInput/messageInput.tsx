import {useState, useEffect, useCallback} from 'react'

interface IProps {
    send(inputText: string): void;
}

const MessageInput = ({send}:IProps) => {

    const [inputText, setInputText] = useState('')
    const handleInput = (e: any) => setInputText(e.target.value)

    const handleSend = useCallback((event) => {
        event.stopPropagation()
        if (event.keyCode === 13 || event._reactName === 'onClick') {
        if (inputText === '') return
        send(inputText)
        setInputText('')}
    }, [send, inputText])
    
    useEffect(() => {
        document.addEventListener("keydown", handleSend, true);
        return () => {
          document.removeEventListener("keydown", handleSend, true);
        };
      }, [handleSend]);

      return (
        <div className='message-box'>
            <input className="message-input" placeholder="Wpisz wiadomość..." onChange={handleInput} value={inputText} type="text" />
            <button className="message-submit" onClick={handleSend}>send</button>
        </div>
    )
}

export default MessageInput