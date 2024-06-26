import { Injectable } from '@nestjs/common';
import { CreatePockerDto } from './dto/create-pocker.dto';
import { UpdatePockerDto } from './dto/update-pocker.dto';

@Injectable()
export class PockerService {
  create(createPockerDto: CreatePockerDto) {
    return 'This action adds a new pocker';
  }

  findAll() {
    return `This action returns all pocker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pocker`;
  }

  update(id: number, updatePockerDto: UpdatePockerDto) {
    return `This action updates a #${id} pocker`;
  }

  remove(id: number) {
    return `This action removes a #${id} pocker`;
  }
}
