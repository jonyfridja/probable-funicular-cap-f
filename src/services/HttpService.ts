import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_baseURL,
})


axios.interceptors.request.use((axiosRequest) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(axiosRequest);
    }
    return axiosRequest;

}, requestError => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(requestError);
    }
    return Promise.reject(requestError);
});

axios.interceptors.response.use(undefined, responseError => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(responseError);
    }
    return Promise.reject(responseError);
});


export const httpService = axios;
