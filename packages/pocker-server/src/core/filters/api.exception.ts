import { HttpException } from '@nestjs/common';

export interface ApiCodeStatus {
    code: string;
    msg: string;
}

export class ApiException extends HttpException {
    private errorMessage: string;
    private errorCode: string;

    constructor(apiCode: ApiCodeStatus, errorMsg?: string) {
        super(apiCode.msg, 200);
        this.errorMessage = errorMsg || apiCode.msg;
        this.errorCode = apiCode.code;
    }

    gerErrorCode(): string {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}
