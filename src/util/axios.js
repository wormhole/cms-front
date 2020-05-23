import axios from "axios";
import { message } from "antd";
import { createHashHistory } from "history";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "/api/api";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token");
        token && (config.headers.Authorization = "Bearer " + token);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const history = createHashHistory();
        switch (error.response.status) {
            case 401:
                history.push("/login");
                break;
            case 403:
                message.error(error.response.data.message);
                history.push("/error/403");
                break;
            default:
                message.error(error.response.data.message);
                break;
        }
        return Promise.reject(error);
    }
);

export default axios;