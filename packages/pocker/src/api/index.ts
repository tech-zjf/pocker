import { AxiosInstance } from 'axios';
import http from './http';
import { LoginApi } from './modules/login';
import { UserApi } from './modules/user';

class Api {
    login: LoginApi;
    user: UserApi;
    constructor(axios: AxiosInstance) {
        this.login = new LoginApi(axios);
        this.user = new UserApi(axios);
    }
}

const $request = new Api(http);

export default $request;
