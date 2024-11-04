import { personalMessageRoute } from "../axios/backend";

const createMessage = async ({ content, receiver, group }) => {
    try {
        const fetchConvos = await personalMessageRoute.post('/createmessage', {
            content, receiver, group
        }, {
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

export default createMessage