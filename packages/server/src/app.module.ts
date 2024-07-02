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
import { WsDemoModule } from './modules/ws-demo/ws-demo.module';

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
    WsDemoModule,
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
