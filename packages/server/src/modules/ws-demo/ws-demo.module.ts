import { Module } from '@nestjs/common';
import { WsDemoService } from './ws-demo.service';
import { WsDemoGateway } from './ws-demo.gateway';

@Module({
  providers: [WsDemoGateway, WsDemoService]
})
export class WsDemoModule {}
