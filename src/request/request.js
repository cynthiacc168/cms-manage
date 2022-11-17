import axios from "axios";

const axiosOption = {
    baseURL: "'http://47.93.114.103:6688/manage",
    timeout: 5000
}

const instance = axios.create(axiosOption);

//request interceptor
instance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})

//response interceptor
instance.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
});

export default instance;