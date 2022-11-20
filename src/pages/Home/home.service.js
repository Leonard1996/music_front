import axiosInstance from "../../common/config/axios.instance"

const getSuggestions = async (payload) => {
    try {
     const result = await axiosInstance.get("/songs/suggestions")

     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

export const HomeService = {
    getSuggestions
}