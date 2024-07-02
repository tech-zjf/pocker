import { Test, TestingModule } from '@nestjs/testing';
import { WsDemoGateway } from './ws-demo.gateway';
import { WsDemoService } from './ws-demo.service';

describe('WsDemoGateway', () => {
  let gateway: WsDemoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsDemoGateway, WsDemoService],
    }).compile();

    gateway = module.get<WsDemoGateway>(WsDemoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
