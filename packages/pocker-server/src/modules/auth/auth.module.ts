import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PlayerModule } from '../player/player.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [PlayerModule],
    exports: [AuthModule],
})
export class AuthModule {}
