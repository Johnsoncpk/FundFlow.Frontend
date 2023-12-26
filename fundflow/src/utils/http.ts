import { message } from "antd";
import axiosClient from "axios";
import { StandardResult } from "types/results";
import { getAccessToken, logout } from "utils/userHelper";
/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        var token = getAccessToken();
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            logout();
        }

        if (err.response) {
            message.error(err.response.data.errorMessage);
            return Promise.reject<StandardResult<null>>(err.response.data);
        }

        if (err.request) {
            return Promise.reject(err.request);
        }
        return Promise.reject(err.message);
    }
);

export default instance;
