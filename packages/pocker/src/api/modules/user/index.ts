import { AxiosInstance } from 'axios';
import { AuthorDetailResponse } from './interface';

export class UserApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getUserInfo(): Promise<AuthorDetailResponse> {
        const user: AuthorDetailResponse = await this.axios.get(`/player`);
        return user;
    }
}
