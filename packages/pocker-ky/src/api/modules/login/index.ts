import { AxiosInstance } from 'axios';
import { LoginParams, LoginResponse } from './interface';

export class LoginApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async login(loginParams: LoginParams): Promise<LoginResponse> {
        const { data } = await this.axios.post('/api/v1/auth/login', {
            ...loginParams
        });
        return data;
    }
}
