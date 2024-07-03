import { Injectable } from '@nestjs/common';
import { CreateWebsocketPockerDto } from './dto/create-websocket-pocker.dto';
import { UpdateWebsocketPockerDto } from './dto/update-websocket-pocker.dto';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { GameRoom } from './interface';

@Injectable()
export class WebsocketPockerService {
    findAll() {
        return ` This action returns all websocketPocker`;
    }

    findOne(id: number) {
        return `This action returns a #${id} websocketPocker`;
    }

    update(id: number, updateWebsocketPockerDto: UpdateWebsocketPockerDto) {
        return `This action updates a #${id} websocketPocker`;
    }

    remove(id: number) {
        return `This action removes a #${id} websocketPocker`;
    }
}
