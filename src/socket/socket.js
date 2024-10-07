import { io } from 'socket.io-client'

const ur = 'http://localhost:8080'
const url = process.env.VERCEL_REACT_APP_SOCKET_URL

const socket = io(url)

export default socket