import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { ApiException } from './api.exception';
import { ApiCode } from '@/constants/api-code';

// 该装饰器告诉filter要捕获哪些类型异常
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof ApiException) {
            const exceptionContent = {
                msg: (exception as ApiException).getErrorMessage(),
                code: (exception as ApiException).gerErrorCode(),
            };
            response.status(200).json(exceptionContent);
        } else if (exception instanceof NotFoundException) {
            response.status(200).json(ApiCode.ROUTER_NOT_FOUND);
        } else {
            response.status(200).json(ApiCode.SYSTEM_ERROR);
        }
    }
}
