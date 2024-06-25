import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from './database/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { PlayerModule } from './modules/player/player.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(ormConfig),
        AuthModule,
        PlayerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
