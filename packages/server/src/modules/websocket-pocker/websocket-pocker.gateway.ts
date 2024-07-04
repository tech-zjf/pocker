import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { WebsocketPockerService } from './websocket-pocker.service';
import { Server, Socket } from 'socket.io';
import { GameRoom } from './interface';
import { RoomService } from '../room/room.service';
import { GetAllRoomDto } from '../room/dto/get-all-room.dto';

@WebSocketGateway({ cors: true })
export class WebsocketPockerGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private readonly websocketPockerService: WebsocketPockerService,
        private readonly roomService: RoomService,
    ) {}

    /** 获取房间列表 */
    @SubscribeMessage('getRoomList')
    async getRoomList(@MessageBody() params: GetAllRoomDto) {
        console.log(`客户端获取了房间列表!`);
        const rooms = await this.roomService.findAll(params);
        this.server.emit('updateRoomList', rooms);
    }

    /** 玩家加入房间 */
    @SubscribeMessage('joinRoom')
    async joinRoom(@MessageBody() joinRoomDto: any, @ConnectedSocket() client: Socket) {
        const { roomNo, uid } = joinRoomDto;
        console.log('玩家加入房间', roomNo, uid);
        // client.join(roomNo);
        // this.server.to(roomNo).emit('joined', `加入了房间`);
        // this.addPlayerByRoomId(room.id, player);
    }
}
