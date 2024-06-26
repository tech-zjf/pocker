import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Uid } from '@/core/decorator/user.decorator';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.create(createPlayerDto);
    }

    async find(@Uid() uid: string) {
        return this.playerService.findOne(uid);
    }

    @Get()
    findAll() {
        return this.playerService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playerService.update(+id, updatePlayerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.playerService.remove(+id);
    }
}
