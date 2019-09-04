import { RealEstate } from './realEstate';
import { StatusRealEstateAd } from './status-real-estate-ad.enum';

export class RealEstateAdRent{
    id: number;
    description: string;
    creationDate: Date;
    realEstate: RealEstate;
    status: StatusRealEstateAd;
    rentprice: number;
    minimummonths: number;
}
