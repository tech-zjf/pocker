import { AxiosInstance } from 'axios';
import http from './http';
import { LoginApi } from './modules/login';
import { UserApi } from './modules/user';
import { RoomApi } from './modules/room';

class Api {
    login: LoginApi;
    user: UserApi;
    room: RoomApi;
    constructor(axios: AxiosInstance) {
        this.login = new LoginApi(axios);
        this.user = new UserApi(axios);
        this.room = new RoomApi(axios);
    }
}

const $request = new Api(http);

export default $request;
