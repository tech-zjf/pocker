import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { WebsocketPockerService } from './websocket-pocker.service';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../room/room.service';
import { GetAllRoomDto } from '../room/dto/get-all-room.dto';
import { JoinRoomDto } from '../room/dto/join-room.dto';
import { PlayerService } from '../player/player.service';

@WebSocketGateway({ cors: true, namespace: 'ws' })
export class WebsocketPockerGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private readonly websocketPockerService: WebsocketPockerService,
        private readonly roomService: RoomService,
        private readonly playerService: PlayerService,
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
    async joinRoom(@MessageBody() joinRoomDto: JoinRoomDto, @ConnectedSocket() client: Socket) {
        try {
            const { roomNo, uid } = joinRoomDto;
            console.log('玩家加入房间', roomNo, uid);
            await this.roomService.joinRoom({ roomNo, uid });
            const player = await this.playerService.findOneByUid(+uid);
            client.join(roomNo);
            this.server.to(roomNo).emit('joined', `${player.nickname} - 加入了房间!`);
            return { status: 'ok' };
        } catch (error) {
            client.emit('join_error', error);
        }
    }
}
