import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '@/database/entityes/player.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>) {}

    async create(createPlayerDto: CreatePlayerDto) {
        const player = this.playerRepository.create(createPlayerDto);
        return await this.playerRepository.save(player);
    }

    async findOne(uid: string) {
        return await this.playerRepository.findOneBy({ uid });
    }

    findAll() {
        return `This action returns all player`;
    }

    update(id: number, updatePlayerDto: UpdatePlayerDto) {
        return `This action updates a #${id} player`;
    }

    remove(id: number) {
        return `This action removes a #${id} player`;
    }
}
