import { Module } from '@nestjs/common';
import { WebsocketPockerService } from './websocket-pocker.service';
import { WebsocketPockerGateway } from './websocket-pocker.gateway';
import { RoomModule } from '../room/room.module';
import { PlayerModule } from '../player/player.module';

@Module({
    imports: [RoomModule, PlayerModule],
    providers: [WebsocketPockerGateway, WebsocketPockerService],
})
export class WebsocketPockerModule {}
