import { PartialType } from '@nestjs/mapped-types';
import { CreateWsDemoDto } from './create-ws-demo.dto';

export class UpdateWsDemoDto extends PartialType(CreateWsDemoDto) {
  id: number;
}
