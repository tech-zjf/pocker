import axios from 'axios';
import { ApiCode } from './constant';
import { message } from 'antd';
import { getToken } from '@/libs/storage';

export const V1PREFIX = '/api/v1';

const http = axios.create({
    timeout: 2000,
    baseURL: import.meta.env.VITE_BASE_URL
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
});

http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use((response) => {
    const { code } = response.data;
    if (code == ApiCode.SUCCESS) {
        return Promise.resolve(response.data);
    } else {
        const { msg } = response.data;
        message.error(msg);
        return Promise.reject(response.data);
    }
});

export default http;
