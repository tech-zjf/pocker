import { AxiosInstance } from 'axios';
import { AuthorDetailResponse } from './interface';

export class UserApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getUserInfo(): Promise<AuthorDetailResponse> {
        const { data } = await this.axios.get(`/api/v1/users/me`);
        return data;
    }
}
