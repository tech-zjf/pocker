import { Test, TestingModule } from '@nestjs/testing';
import { WsDemoService } from './ws-demo.service';

describe('WsDemoService', () => {
  let service: WsDemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsDemoService],
    }).compile();

    service = module.get<WsDemoService>(WsDemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
