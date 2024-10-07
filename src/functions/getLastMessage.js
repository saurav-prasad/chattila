const { personalMessageRoute } = require("../axios/axios");

const getLastMessage = async (userId) => {
    try {
        const lastMessage = await personalMessageRoute.get(`/getlastmessage/${userId}`, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return lastMessage.data
    } catch (error) {
        // console.log(error);
        return error
    }
}
export default getLastMessage