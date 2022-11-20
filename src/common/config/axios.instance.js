import axios from "axios"
const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    (config) => {
        config.headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        config.baseURL= process.env.REACT_APP_BASE_API;
        
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;