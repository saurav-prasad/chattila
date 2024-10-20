import { convosRoute } from "../axios/axios";

const addConvos = async (userid) => {
    try {
        // console.log("object");
        const addedConvos = await convosRoute.post(`/adduser/${userid}`,{}, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        // console.log(addedConvos.data.data);
        return addedConvos.data
    } catch (error) {
        console.log(error);
        return error
    }
}

export default addConvos