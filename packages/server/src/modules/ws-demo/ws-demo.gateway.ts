import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsDemoService } from './ws-demo.service';
import { CreateWsDemoDto } from './dto/create-ws-demo.dto';
import { UpdateWsDemoDto } from './dto/update-ws-demo.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ origin: '*', cors: true })
export class WsDemoGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly wsDemoService: WsDemoService) {}

  @SubscribeMessage('createWsDemo')
  create(@MessageBody() createWsDemoDto: CreateWsDemoDto) {
    this.server.emit('message', '我是服务端12313');
    return this.wsDemoService.create(createWsDemoDto);
  }

  @SubscribeMessage('findAllWsDemo')
  findAll() {
    return this.wsDemoService.findAll();
  }

  @SubscribeMessage('findOneWsDemo')
  findOne(@MessageBody() id: number) {
    return this.wsDemoService.findOne(id);
  }

  @SubscribeMessage('updateWsDemo')
  update(@MessageBody() updateWsDemoDto: UpdateWsDemoDto) {
    return this.wsDemoService.update(updateWsDemoDto.id, updateWsDemoDto);
  }

  @SubscribeMessage('removeWsDemo')
  remove(@MessageBody() id: number) {
    return this.wsDemoService.remove(id);
  }
}
