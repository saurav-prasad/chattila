import { authRoute } from "../axios/axios";

const fetchUsers = async () => {
    try {

        const userData = await authRoute.get('/fetchuser', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return userData.data
    } catch (error) {
        console.log(error);
        return error
    }

}
export default fetchUsers