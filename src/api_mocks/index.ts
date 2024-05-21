import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';

const service: AxiosInstance = axios.create({
    timeout: 5000,
    baseURL: import.meta.env.DEV ? '/api' : '/api'
});

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.headers)
            config.headers['Authorization'] = String(localStorage.getItem('iSmartToiletAdminToken'))
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
        if (response && response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        if (error.response?.status === 401) {
            localStorage.removeItem('iSmartToiletAdminToken')
        }
        return Promise.reject(error);
    }
);

export default service;