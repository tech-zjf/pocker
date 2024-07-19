import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '@/database/entityes/rooms-entity';
import { Repository } from 'typeorm';
import StringTools from '@/tools/string-tools';
import { RoomPlayersStatusEnum, RoomStatusEnum } from './interface';
import { GetAllRoomDto } from './dto/get-all-room.dto';
import { RoomPlayersEntity } from '@/database/entityes/room-players.entity';
import { ApiException } from '@/core/filters/api.exception';
import { ApiCode } from '@/constants/api-code';
import { JoinRoomDto } from './dto/join-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomsEntity) private readonly roomRepo: Repository<RoomsEntity>,
        @InjectRepository(RoomPlayersEntity) private readonly roomPlayersRepo: Repository<RoomPlayersEntity>,
    ) {}

    /**
     *  创建房间
     */
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

    /**
     * 获取房间列表
     */
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

    /** 加入房间 */
    async joinRoom(joinRoomDto: JoinRoomDto) {
        // 拿到当前房间
        const room = await this.findOneByRoomNo(joinRoomDto.roomNo);
        // 拿到当前用户关的房间
        const players = await this.roomPlayersRepo.findOne({ where: { uid: joinRoomDto.uid, leaveTime: null } });
        if (players && joinRoomDto.roomNo == players.roomNo) {
            return '您已经在当前房间内！';
        }
        if (players && joinRoomDto.roomNo !== players.roomNo) {
            throw new ApiException({ code: ApiCode.JOIN_ERROR.code, msg: '您已经在其他游戏房间中！' });
        }
        // 人数已满
        if (room.readyPlayers === room.maxPlayers) {
            throw new ApiException({ code: ApiCode.JOIN_ERROR.code, msg: '房间人数满了！' });
        }
        // 游戏中状态
        if (room.roomState === RoomStatusEnum.GAMEING) {
            throw new ApiException({ code: ApiCode.JOIN_ERROR.code, msg: '游戏中，禁止加入！' });
        }
        try {
            const createRoomPlayer = await this.roomPlayersRepo.create({
                ...joinRoomDto,
                playerStatus: RoomPlayersStatusEnum.READING,
            });
            await this.roomPlayersRepo.save(createRoomPlayer);
            // 更新房间人数
            await this.roomRepo
                .createQueryBuilder()
                .update()
                .set({
                    playerNum: room.playerNum + 1,
                    readyPlayers: room.readyPlayers + 1,
                })
                .where('roomNo = :roomNo', { roomNo: joinRoomDto.roomNo })
                .execute();
            return createRoomPlayer;
        } catch (error) {
            throw new ApiException(ApiCode.JOIN_ERROR);
        }
    }

    /** 根据房间号查找房间 */
    async findOneByRoomNo(roomNo: string) {
        return await this.roomRepo.findOne({ where: { roomNo: roomNo } });
    }

    async IsJoinRoomByUid(joinRoomDto: JoinRoomDto) {}

    async findOne(id: string) {
        return 'findOne';
    }

    update(id: number, updateRoomDto: UpdateRoomDto) {
        return `This action updates a #${id} room`;
    }

    remove(id: number) {
        return `This action removes a #${id} room`;
    }
}
