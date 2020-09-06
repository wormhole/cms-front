import axios from "axios";
import {message} from "antd";
import {createHashHistory} from "history";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "" : "/api";

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
        return response.data;
    },
    error => {
        const history = createHashHistory();
        switch (error.response.status) {
            case 401:
                message.warn(error.result.message);
                window.localStorage.removeItem("token");
                history.push("/login");
                break;
            case 403:
                message.error(error.result.message);
                history.push("/error/403");
                break;
            default:
                message.error(error.result.message);
                break;
        }
        return Promise.reject(error);
    }
);

export default axios;