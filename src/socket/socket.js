import { io } from 'socket.io-client'

const ur = 'http://localhost:8080'
const url = process.env.REACT_APP_SOCKET_URL
console.log(url);
const socket = io(url)

export default socket