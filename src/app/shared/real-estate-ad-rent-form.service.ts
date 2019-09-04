import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RealEstateAdRent } from '../model/real-estate-ad-rent';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';
import { TypeRealEstate } from '../model/type-real-estate.enum';

@Injectable({
  providedIn: 'root'
})
export class RealEstateAdRentFormService {
  createAdRent = false;
  updateAdRent = false;
  viewAdRent = false;

  adRent: RealEstateAdRent = {
    id: 0,
    description: '',
    creationDate: null,
    realEstate: {
      idrealestate: 0,
      type: TypeRealEstate.APARTMENT,
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
    rentprice: 0,
    minimummonths: 0
  }

  constructor() { }

  view(row){
    this.createAdRent = false;
    this.updateAdRent = false;
    this.viewAdRent = true;
    this.adRent = row;
    this.adRent.realEstate = row.realEstate;
  }

  update(row){
    this.createAdRent = false;
    this.updateAdRent = true;
    this.viewAdRent = false;
    this.adRent = row;
    this.adRent.realEstate = row.realEstate;

  }

  create(row){
    this.createAdRent = true;
    this.updateAdRent = false;
    this.viewAdRent = false;
    this.adRent.realEstate = row;
  }
}
