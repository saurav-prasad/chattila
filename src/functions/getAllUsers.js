import { authRoute } from "../axios/axios";

const getAllUsers = async () => {
    try {
        const allUsers = await authRoute.get('/getallusers', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return allUsers.data
    } catch (error) {
        // console.log(error);
        return error
    }
}

export default getAllUsers