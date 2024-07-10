import { ApiCode } from './constant';

export interface ApiResponse<T> {
    code: ApiCode;
    msg?: string;
    data: T;
}
