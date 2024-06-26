import { Module } from '@nestjs/common';
import { PockerService } from './pocker.service';
import { PockerController } from './pocker.controller';

@Module({
  controllers: [PockerController],
  providers: [PockerService]
})
export class PockerModule {}
