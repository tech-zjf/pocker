import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.use(cors()); // 配置跨域
    app.useGlobalFilters(new AllExceptionsFilter());
    // app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // 开启一个全局验证管道，否则class-validator无效
    await app.listen(3000);
}
bootstrap();
