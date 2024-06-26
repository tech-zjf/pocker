import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PockerService } from './pocker.service';
import { CreatePockerDto } from './dto/create-pocker.dto';
import { UpdatePockerDto } from './dto/update-pocker.dto';

@Controller('pocker')
export class PockerController {
  constructor(private readonly pockerService: PockerService) {}

  @Post()
  create(@Body() createPockerDto: CreatePockerDto) {
    return this.pockerService.create(createPockerDto);
  }

  @Get()
  findAll() {
    return this.pockerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pockerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePockerDto: UpdatePockerDto) {
    return this.pockerService.update(+id, updatePockerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pockerService.remove(+id);
  }
}
