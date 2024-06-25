import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PlayerModule } from '../player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '@/database/entityes/player.entity';

@Module({
    imports: [PlayerModule, TypeOrmModule.forFeature([Player])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthModule],
})
export class AuthModule {}
