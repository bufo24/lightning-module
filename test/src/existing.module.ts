import { Module } from '@nestjs/common';

import { LightningConfigService } from './lightning-config.service';

@Module({
    providers: [LightningConfigService],
    exports: [LightningConfigService],
})
export class ExistingModule {}
