import { AxiosInstance } from 'axios';
import { CreateRoomParams } from './interface';

export class RoomApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async createRoom(params: CreateRoomParams) {
        const { data } = await this.axios.post('/room', params);
        return data;
    }
}
