import { io } from 'socket.io-client'

const url = 'http://localhost:8080'
const ur = process.env.REACT_APP_SOCKET_URL
// console.log(url);
const socket = io(url)

export default socket