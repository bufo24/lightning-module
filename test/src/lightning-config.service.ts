import { Injectable } from '@nestjs/common';

import {
    LightningOptionsFactory,
    LightningModuleOptions,
} from '../../lib/lightning.interfaces';

@Injectable()
export class LightningConfigService
    implements LightningOptionsFactory
{
    createLightningOptions(): LightningModuleOptions {
        return {
            macaroon: '<MACAROON>',
            restUrl: '<VALID_IP>',
            tlsCert: '<TLS_CERT>',
        };
    }
}
