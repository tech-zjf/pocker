import { AxiosInstance } from 'axios';
import http from './http';
import { LoginApi } from './modules/login';

class Api {
    login: LoginApi;
    constructor(axios: AxiosInstance) {
        this.login = new LoginApi(axios);
    }
}

const $request = new Api(http);

export default $request;
