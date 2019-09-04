import { Client } from './client';
import { RealEstateAdRent } from './real-estate-ad-rent';

export interface ViewingAppointmentRent {
    id: number;
    date: Date;
    client: Client;
    realEstateAd: RealEstateAdRent;
}
