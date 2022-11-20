import axiosInstance from "../../common/config/axios.instance"

const getSongs = async (keyword) => {
    try {
     const result = await axiosInstance.get("/songs?keyword="+keyword)

     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

const getMyFavorites = async (limit, page=1) => {
    try {
    // making limit 1000 since I didnt predict that i might need a get all favorites api
    // also didnt want to spend more time in backend
    limit = limit || 1000;
     const result = await axiosInstance.get(`me/favorites?limit=${limit}&page=${page}`)
     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

const like = async (payload) => {
    try {
     const result = await axiosInstance.post('/favorites', payload)
     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

const dislike = async (id) => {
    try {
     const result = await axiosInstance.delete('/favorites/' + id)
     return [result, null]
    } catch (error) {
        return [null, error]
    }
}

export const SongsService = {
    getSongs,
    getMyFavorites,
    like,
    dislike
}