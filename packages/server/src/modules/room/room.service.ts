import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '@/database/entityes/rooms-entity';
import { Repository } from 'typeorm';
import StringTools from '@/tools/string-tools';
import { RoomStatusEnum } from './interface';
import { GetAllRoomDto } from './dto/get-all-room.dto';
import { RoomPlayersEntity } from '@/database/entityes/room-players.entity';
import { ApiException } from '@/core/filters/api.exception';
import { ApiCode } from '@/constants/api-code';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomsEntity) private readonly roomRepo: Repository<RoomsEntity>,
        @InjectRepository(RoomPlayersEntity) private readonly roomPlayersRepo: Repository<RoomPlayersEntity>,
    ) {}

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
            return res;
        } catch (error) {
            throw new ApiException(ApiCode.CREATE_ROOM_ERROR);
        }
    }

    async findAll(params: GetAllRoomDto) {
        try {
            const qb = this.roomRepo
                .createQueryBuilder('room')
                .take(params.pageSize)
                .skip((params.page - 1) * params.pageSize)
                .orderBy(`room.${params.orderBy}`, params.order);
            return {
                list: await qb.getMany(),
                total: await qb.getCount(),
            };
        } catch (error) {}
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
