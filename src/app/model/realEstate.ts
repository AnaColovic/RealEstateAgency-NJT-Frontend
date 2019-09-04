import { City } from './city';
import { Client } from './client';
import { TypeRealEstate } from './type-real-estate.enum';

export interface RealEstate {
    idrealestate: number;
    type: TypeRealEstate;
    rooms: number;
    area: number;
    floor: number;
    description: string;
    adress: string;
    city: City;
    owner: Client;
    fileName: string;
    fileImg: string;
}
