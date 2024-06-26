import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Phone } from '@/core/decorator/user.decorator';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.create(createPlayerDto);
    }

    @Get()
    async findOneByPhone(@Phone() phone: string) {
        return this.playerService.findOneByPhone(phone);
    }
}
