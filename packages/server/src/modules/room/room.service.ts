import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '@/database/entityes/rooms-entity';
import { Repository } from 'typeorm';
import StringTools from '@/tools/string-tools';
import { RoomStatusEnum } from './interface';

@Injectable()
export class RoomService {
    constructor(@InjectRepository(RoomsEntity) private readonly roomRepo: Repository<RoomsEntity>) {}

    async create(createRoomDto: CreateRoomDto) {
        try {
            const createRoom = await this.roomRepo.create({
                ...createRoomDto,
                playerNum: 0,
                readyPlayers: 0,
                roomNo: StringTools.generateRandomString(),
                roomState: RoomStatusEnum.WAIT,
            });
            const res = await this.roomRepo.save(createRoom);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        }
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
