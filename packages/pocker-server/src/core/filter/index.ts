import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status: number;
        let message: string | object;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse();
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'Internal server error',
            };
        }
        response.status(status).json(message);
    }
}
