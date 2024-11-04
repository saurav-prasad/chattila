import axios from "axios"

const url = process.env.REACT_APP_AI_URL
const ul = 'http://localhost:5000/generatetext'
// console.log(url);

export const aiRoute = axios.create((
    {
        baseURL: url
    }
))

