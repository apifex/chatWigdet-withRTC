
import TelegramLogo from '../../assets/Telegram_logo.svg'
import WhatsappLogo from '../../assets/whatsapp-icon.svg';
const ChatHeader = () => {

    const sendTelegramMsg = async () => {
        const telegramUserName = await fetch('https://widgettelegram-server.azurewebsites.net/gettelegramusername',
                     ).then(response=>response.json().then(data=>data))
        window.open(`https://telegram.me/${telegramUserName}`)
    }

    const sendWhatsappMsg = async () => {
        const whatsappNumber = await fetch('https://widgettelegram-server.azurewebsites.net/getwhatsappnumber',
                     ).then(response=>response.json().then(data=>data))
        window.open(`https://wa.me/${whatsappNumber}?text=hello`)
    }
        

    return (
        <div className='chat-title'>
            <h2>Jeśli chcesz użyć swojego komunikatora kliknij w ikonkę: </h2>
            <img className='chat-icon-sm' onClick={sendTelegramMsg} src={TelegramLogo} alt="telegramicon"/>
            <img className='chat-icon-sm' onClick={sendWhatsappMsg} src={WhatsappLogo} alt="telegramicon"/>
            <h1>Jesteśmy tutaj, żeby Ci pomóc</h1>
            <h2>Odpowiadamy średnio w 3 min</h2>
        </div>
    )
}

export default ChatHeader