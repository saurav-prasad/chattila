import { personalMessageRoute } from "../axios/backend"

const readAllMessages = async (senderId) => {
    try {
        const isUpdated = await personalMessageRoute.post(`/readallmessages/${senderId}`, {}, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return true
    } catch (error) {
        // console.log(error);
        return error
    }
}

export default readAllMessages