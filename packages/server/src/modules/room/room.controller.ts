import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetAllRoomDto } from './dto/get-all-room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.create(createRoomDto);
    }

    @Get()
    findAll(params: GetAllRoomDto) {
        return this.roomService.findAll(params);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomService.update(+id, updateRoomDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(+id);
    }
}
