import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_baseURL,
})


axios.interceptors.request.use((axiosRequest) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(axiosRequest);
    }
    return axiosRequest;
})

export const httpService = axios;
