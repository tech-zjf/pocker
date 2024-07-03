import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JWT_CONFIG } from './modules/auth/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ormConfig } from './database/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { PlayerModule } from './modules/player/player.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { JwtMiddleware } from './core/middleware/jwt.middleware';
import { WebsocketPockerModule } from './modules/websocket-pocker/websocket-pocker.module';
import { RoomModule } from './modules/room/room.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(ormConfig),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: JWT_CONFIG.JWT_SECRET, // 秘钥
                    signOptions: {
                        expiresIn: JWT_CONFIG.JWT_EXPIRES_IN, // token 一年过期
                    },
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        PlayerModule,
        WebsocketPockerModule,
        RoomModule,
    ],
    controllers: [AppController],
    providers: [
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        {
            provide: APP_INTERCEPTOR,
            useClass: ApiInterceptor,
        },
        AppService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, JwtMiddleware).forRoutes('*');
    }
}
