import { RealEstate } from './realEstate';
import { StatusRealEstateAd } from './status-real-estate-ad.enum';

export class RealEstateAdSell{
    id: number;
    description: string;
    creationDate: Date;
    realEstate: RealEstate;
    status: StatusRealEstateAd;
    price: number;
    registered: boolean;
}
