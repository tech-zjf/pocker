import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetAllRoomDto } from './dto/get-all-room.dto';
import { Phone } from '@/core/decorator/user.decorator';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.create(createRoomDto);
    }

    @Post(':roomNo')
    joinRoom(@Param('roomNo') roomNo: string, @Body() joinRoomDto: { uid: string }) {
        return this.roomService.joinRoom({ ...joinRoomDto, roomNo });
    }

    @Get()
    findAll(params: GetAllRoomDto) {
        return this.roomService.findAll(params);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomService.findOne(id);
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
