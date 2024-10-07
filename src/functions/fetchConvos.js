import { authRoute, convosRoute } from "../axios/axios";

const fetchConvos = async () => {
    try {
        const fetchConvos = await convosRoute.get('/fetchconvos', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        // console.log(fetchConvos.data.data);
        return fetchConvos.data
    } catch (error) {
        console.log(error);
        return error 
    }
}

export default fetchConvos