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

    /** 创建房间 */
    @SubscribeMessage('createRoom')
    async createRoom(@MessageBody() room: Record<string, any>, @ConnectedSocket() client: Socket) {
        // await this.rooms.push({
        //     ...room,
        //     players: [],
        //     playerSize: 0,
        // });
        // await this.server.emit('updateRoomList', this.rooms);
    }

    /** 玩家加入房间 */
    @SubscribeMessage('joinRoom')
    async joinRoom(@MessageBody() joinRoomDto: any, @ConnectedSocket() client: Socket) {
        const { room, player } = joinRoomDto;
        await this.server.to(room.id).emit('joined', `加入了房间`);
        console.log(room, player);
        await this.addPlayerByRoomId(room.id, player);
        await client.join(room.id);
    }

    addPlayerByRoomId(roomId: string, player) {
        // const room = this.rooms.find((r) => r.id == roomId);
        // if (!room) {
        //     throw new Error('找不到该房间！');
        // }
        // this.rooms = [...this.rooms].map((v) => {
        //     if (v.id == roomId) {
        //         return {
        //             ...v,
        //             players: [...v.players, player],
        //             playerSize: v.playerSize + 1,
        //         };
        //     } else {
        //         return v;
        //     }
        // });
    }
}
