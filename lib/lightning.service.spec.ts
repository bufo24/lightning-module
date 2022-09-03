import { Test, TestingModule } from '@nestjs/testing';

import { LightningService } from './lightning.service';
import { LND_REST } from './lightning.constants';

describe('ExampleService', () => {
    let module: TestingModule;
    let service: LightningService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                LightningService,
                {
                    provide: LND_REST,
                    useValue: jest.fn(),
                },
            ],
        }).compile();

        service = module.get<LightningService>(LightningService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
