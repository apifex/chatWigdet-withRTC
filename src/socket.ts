import {io} from 'socket.io-client'

export const socket = io('https://widgettelegram-server.azurewebsites.net/', 
{transports: ['websocket']});

