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
            // 判断当前玩家能否加入房间，可以的话创建关联关系
            await this.roomService.joinRoom({ roomNo, uid });
            // 获取玩家信息
            const player = await this.playerService.findOneByUid(+uid);
            // 将当前玩家添加到房间
            client.join(roomNo);
            //向当前房间的其他玩家推送：xxx玩家加入了房间
            this.server.to(roomNo).emit('joined', `${player.nickname} - 加入了房间!`);
            // TODO
            // 1. 推送当前房间的玩家列表给当前房间的玩家
            const players = await this.roomService.findPlayersByRoomNo(roomNo);
            console.log('players', players);
            this.server.emit('update_room_players', players);
            return { status: 'ok' };
        } catch (error) {
            client.emit('join_error', error);
        }
    }
}
