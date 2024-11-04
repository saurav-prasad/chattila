import { convosRoute } from "../axios/backend";

const removeConvos = async (userid) => {
    try {
        // console.log("object");
        const removedConvos = await convosRoute.post(`/removeuser/${userid}`, {}, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        // console.log(removedConvos.data.data);
        return removedConvos.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export default removeConvos