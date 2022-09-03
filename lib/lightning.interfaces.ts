import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

// Will most likely be an interface
export type LightningModuleOptions = {
    restUrl: string;
    macaroon: string;
    tlsCert: string;
};

export interface LightningOptionsFactory {
    createLightningOptions(): LightningModuleOptions;
}

export interface ExampleModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useClass?: Type<LightningOptionsFactory>;
    useExisting?: Type<LightningOptionsFactory>;
    useFactory?: (...args: any[]) => LightningModuleOptions;
    inject?: any[];
}
