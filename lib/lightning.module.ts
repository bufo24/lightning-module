import {
    Type,
    Module,
    Provider,
    DynamicModule,
} from '@nestjs/common';

import {
    LightningModuleOptions,
    LightningOptionsFactory,
    ExampleModuleAsyncOptions,
} from './lightning.interfaces';
import { LightningService } from './lightning.service';
import { LND_REST, TLS_CERT } from './lightning.constants';
import axios from 'axios';

@Module({
    providers: [LightningService],
    exports: [LightningService],
})
export class LightningModule {
    static register(options: LightningModuleOptions): DynamicModule {
        return {
            module: LightningModule,
            providers: [
                {
                    provide: LND_REST,
                    useValue: axios.create({
                        baseURL: options.restUrl,
                        headers: {
                            'Grpc-Metadata-macaroon':
                                options.macaroon,
                        },
                    }),
                },
                { provide: TLS_CERT, useValue: options.tlsCert },
            ],
            exports: [LightningService],
        };
    }

    static registerAsync(
        options: ExampleModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: LightningModule,
            providers: [...this.createAsyncProviders(options)],
            imports: options.imports || [],
        };
    }

    static createAsyncProviders(
        options: ExampleModuleAsyncOptions,
    ): Provider[] {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass =
            options.useClass as Type<LightningOptionsFactory>;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }

    static createAsyncOptionsProvider(
        options: ExampleModuleAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: LND_REST,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        const inject = [
            (options.useClass ||
                options.useExisting) as Type<LightningOptionsFactory>,
        ];

        return {
            provide: LND_REST,
            useFactory: (factory: LightningOptionsFactory) =>
                factory.createLightningOptions(),
            inject,
        };
    }
}
