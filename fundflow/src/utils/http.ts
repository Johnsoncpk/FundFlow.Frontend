import axiosClient from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
    baseURL: "http://localhost:44120",
    timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        var token = localStorage.getItem("ACCESS_TOKEN");
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    (error) => {
        console.log("Error occured while request");
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log(err);
        if (err.response.status === 401) {
            const navigate = useNavigate();
            localStorage.clear();
            navigate(window.location.origin);
        }

        if (err.response) {
            return Promise.reject(err.response.data);
        }

        if (err.request) {
            return Promise.reject(err.request);
        }
        return Promise.reject(err.message);
    }
);

export default instance;
