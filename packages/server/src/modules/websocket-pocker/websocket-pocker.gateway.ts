import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { WebsocketPockerService } from './websocket-pocker.service';
import { CreateWebsocketPockerDto } from './dto/create-websocket-pocker.dto';
import { UpdateWebsocketPockerDto } from './dto/update-websocket-pocker.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketPockerGateway {
    @WebSocketServer()
    server: Server;
    constructor(private readonly websocketPockerService: WebsocketPockerService) {}

    @SubscribeMessage('createWebsocketPocker')
    create(@MessageBody() createWebsocketPockerDto: CreateWebsocketPockerDto) {
        return this.websocketPockerService.create(createWebsocketPockerDto);
    }

    @SubscribeMessage('findAllWebsocketPocker')
    findAll() {
        return this.websocketPockerService.findAll();
    }

    @SubscribeMessage('findOneWebsocketPocker')
    findOne(@MessageBody() id: number) {
        return this.websocketPockerService.findOne(id);
    }

    @SubscribeMessage('updateWebsocketPocker')
    update(@MessageBody() updateWebsocketPockerDto: UpdateWebsocketPockerDto) {
        return this.websocketPockerService.update(updateWebsocketPockerDto.id, updateWebsocketPockerDto);
    }

    @SubscribeMessage('removeWebsocketPocker')
    remove(@MessageBody() id: number) {
        return this.websocketPockerService.remove(id);
    }
}
