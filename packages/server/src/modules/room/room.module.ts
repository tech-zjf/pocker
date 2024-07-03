import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsEntity } from '@/database/entityes/rooms-entity';

@Module({ imports: [TypeOrmModule.forFeature([RoomsEntity])], controllers: [RoomController], providers: [RoomService], exports: [RoomService] })
export class RoomModule {}
