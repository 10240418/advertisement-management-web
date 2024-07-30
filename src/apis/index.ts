import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';

const service: AxiosInstance = axios.create({
    timeout: 5000,
    baseURL: import.meta.env.DEV ? '/api' : '/api'
});
// 请求拦截器 添加token
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.headers)
            config.headers['Authorization'] = String(localStorage.getItem('AdminToken'))
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);
// 响应拦截器 响应错误处理
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
            localStorage.removeItem('AdminToken')
        }
        return Promise.reject(error);
    }
);

export default service;