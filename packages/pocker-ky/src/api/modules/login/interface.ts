import { AuthorDetailResponse } from '../user/interface';

export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}
