import { Module, DynamicModule } from '@nestjs/common';

import { LightningModule } from '../../lib/lightning.module';
import { ExistingModule } from './existing.module';
import { LightningConfigService } from './lightning-config.service';

@Module({
    exports: [LightningModule],
})
export class AppModule {
    static withRegister(): DynamicModule {
        return {
            module: AppModule,
            imports: [LightningModule.register({})],
        };
    }

    static withUseFactoryRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                LightningModule.registerAsync({
                    useFactory: () => ({}),
                }),
            ],
        };
    }

    static withUseClassRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                LightningModule.registerAsync({
                    useClass: LightningConfigService,
                }),
            ],
        };
    }

    static withUseExistingRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                LightningModule.registerAsync({
                    useExisting: LightningConfigService,
                    imports: [ExistingModule],
                }),
            ],
        };
    }
}
