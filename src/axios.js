import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:3001"
    baseURL: "https://api.jogjoy.run"
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})

export default instance; 
