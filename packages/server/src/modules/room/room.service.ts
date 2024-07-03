import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '@/database/entityes/rooms-entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(@InjectRepository(RoomsEntity) private readonly roomRepo: Repository<RoomsEntity>) {}
    async create(createRoomDto: CreateRoomDto) {
        const createRoom = await this.roomRepo.create({
            ...createRoomDto,
            playerNum: 0,
            readyPlayers: 0,
            roomNo: new Date().toString(),
            roomState: 1,
        });
        const res = await this.roomRepo.save(createRoom);
        return res;
    }

    findAll() {
        return `This action returns all room`;
    }

    findOne(id: number) {
        return `This action returns a #${id} room`;
    }

    update(id: number, updateRoomDto: UpdateRoomDto) {
        return `This action updates a #${id} room`;
    }

    remove(id: number) {
        return `This action removes a #${id} room`;
    }
}
