import axios from 'axios'

const url = process.env.VERCEL_REACT_APP_SERVER_URL
const url1 = 'http://localhost:5500'

export const authRoute = axios.create({
    baseURL: `${url}/auth`
})
export const groupRoute = axios.create({
    baseURL: `${url}/group`
})
export const personalMessageRoute = axios.create({
    baseURL: `${url}/message/personalmessage`
})
export const groupMessageRoute = axios.create({
    baseURL: `${url}/message/groupmessage`
})
export const convosRoute = axios.create({
    baseURL: `${url}/convos`
})