import { PartialType } from '@nestjs/mapped-types';
import { CreateWebsocketPockerDto } from './create-websocket-pocker.dto';

export class UpdateWebsocketPockerDto extends PartialType(CreateWebsocketPockerDto) {
  id: number;
}
