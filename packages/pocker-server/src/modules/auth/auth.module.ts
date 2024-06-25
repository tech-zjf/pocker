import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PlayerModule } from '../player/player.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from './constants';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: JWT_CONFIG.JWT_SECRET,
                    signOptions: {
                        expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
                    },
                };
            },
            inject: [ConfigService],
        }),
        PlayerModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthModule],
})
export class AuthModule {}
