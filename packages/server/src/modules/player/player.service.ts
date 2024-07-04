import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '@/database/entityes/player.entity';
import { Repository } from 'typeorm';
import { ApiException } from '@/core/filters/api.exception';
import { ApiCode } from '@/constants/api-code';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>) {}

    async create(createPlayerDto: CreatePlayerDto) {
        const createPlayer = await this.playerRepository.create(createPlayerDto);
        const res = await this.playerRepository.save(createPlayer);
        return res;
    }

    async findOneByPhone(phone: string) {
        if (!phone) {
            throw new ApiException(ApiCode.NOT_LOGIN);
        }
        return await this.playerRepository.findOneBy({ phone });
    }

    async findOneByUid(uid: number) {
        return await this.playerRepository.findOne({ where: { uid, deleteTime: null } });
    }
}
