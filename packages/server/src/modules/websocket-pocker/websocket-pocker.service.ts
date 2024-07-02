import { Injectable } from '@nestjs/common';
import { CreateWebsocketPockerDto } from './dto/create-websocket-pocker.dto';
import { UpdateWebsocketPockerDto } from './dto/update-websocket-pocker.dto';

@Injectable()
export class WebsocketPockerService {
  create(createWebsocketPockerDto: CreateWebsocketPockerDto) {
    return 'This action adds a new websocketPocker';
  }

  findAll() {
    return `This action returns all websocketPocker`;
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
