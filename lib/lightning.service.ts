import * as https from 'https';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { LND_REST, TLS_CERT } from './lightning.constants';
import { Invoice } from './types';

@Injectable()
export class LightningService {
    constructor(
        @Inject(LND_REST)
        private readonly lndRest: AxiosInstance,
        @Inject(TLS_CERT)
        private readonly tlsCert: string,
    ) {
        const httpsAgent = new https.Agent({
            ca: tlsCert,
            rejectUnauthorized: false,
        });
        lndRest.defaults.httpAgent = httpsAgent;
        lndRest.defaults.httpsAgent = httpsAgent;
    }

    async createInvoice(
        value: number,
        memo: string,
        expiry = 3600,
    ): Promise<Invoice> {
        return (
            await this.doLndPost<{ data: Invoice }>(`v1/invoices`, {
                value,
                memo,
                expiry,
            })
        ).data;
    }

    private async doLndGet<T>(endpoint: string): Promise<T> {
        return await this.lndRest.get(endpoint);
    }

    private async doLndPost<T>(
        endpoint: string,
        body: any,
    ): Promise<T> {
        return await this.lndRest.post(endpoint, body, {
            responseType: 'json',
        });
    }
}
