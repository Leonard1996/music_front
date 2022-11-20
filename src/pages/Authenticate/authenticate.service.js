import axiosInstance from "../../common/config/axios.instance"

const signup = async (payload) => {
    try {
     const result = await axiosInstance.post("/signup", payload)

     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

const login = async (payload) => {
    try {
     const result = await axiosInstance.post("/login", payload)

     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

export const AuthenticateService = {
    signup,
    login
}