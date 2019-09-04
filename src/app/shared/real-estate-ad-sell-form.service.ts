import { Injectable } from '@angular/core';
import { RealEstateAdSell } from '../model/real-estate-ad-sell';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';

@Injectable({
  providedIn: 'root'
})
export class RealEstateAdSellFormService {
  createAdSell = false;
  updateAdSell = false;
  viewAdSell = false;

  adSell: RealEstateAdSell = {
    id: 0,
    description: '',
    creationDate: null,
    realEstate: {
      idrealestate: 0,
      type: null,
      rooms: 0,
      area: 0,
      floor: 0,
      description: '',
      adress: '',
      city: {
        idcity: 0,
        name: ''
      },
      owner: JSON.parse(localStorage.getItem("client")),
      fileName: '',
      fileImg: ''
    },
    status: StatusRealEstateAd.NOT_APPROVED,
    price: 0,
    registered: false
  }

  constructor() { }

  view(row){
    this.createAdSell = false;
    this.updateAdSell = false;
    this.viewAdSell = true;
    this.adSell = row;
    this.adSell.realEstate = row.realEstate;
  }

  update(row){
    this.createAdSell = false;
    this.updateAdSell = true;
    this.viewAdSell = false;
    this.adSell = row;
    this.adSell.realEstate = row.realEstate;
  }

  create(row){
    this.createAdSell = true;
    this.updateAdSell = false;
    this.viewAdSell = false;
    this.adSell.realEstate = row;
  }
}
