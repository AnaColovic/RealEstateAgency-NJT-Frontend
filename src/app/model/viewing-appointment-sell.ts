import { RealEstateAdSell } from './real-estate-ad-sell';
import { Client } from './client';

export interface ViewingAppointmentSell {
    id: number;
    date: Date;
    client: Client;
    realEstateAd: RealEstateAdSell;
}
