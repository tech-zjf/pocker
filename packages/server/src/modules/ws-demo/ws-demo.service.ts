import { Injectable } from '@nestjs/common';
import { CreateWsDemoDto } from './dto/create-ws-demo.dto';
import { UpdateWsDemoDto } from './dto/update-ws-demo.dto';

@Injectable()
export class WsDemoService {
  create(createWsDemoDto: CreateWsDemoDto) {
    return 'This action adds a new wsDemo';
  }

  findAll() {
    return `This action returns all wsDemo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wsDemo`;
  }

  update(id: number, updateWsDemoDto: UpdateWsDemoDto) {
    return `This action updates a #${id} wsDemo`;
  }

  remove(id: number) {
    return `This action removes a #${id} wsDemo`;
  }
}
