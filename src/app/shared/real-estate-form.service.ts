import { Injectable } from '@angular/core';
import { RealEstate } from '../model/realEstate';
import { ApiService } from './api.service';
import { RealEstateAdRentFormService } from './real-estate-ad-rent-form.service';
import { RealEstateAdSellFormService } from './real-estate-ad-sell-form.service';
import { TypeRealEstate } from '../model/type-real-estate.enum';

@Injectable({
  providedIn: 'root'
})
export class RealEstateFormService {
  createRealEstate = false;
  updateRealEstate = false;
  viewRealEstate = false;
  ad = false;

  realEstate : RealEstate = {
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
  }

  constructor(private rentService: RealEstateAdRentFormService, private sellService: RealEstateAdSellFormService) { }

  view(row){
    this.createRealEstate = false;
    this.updateRealEstate = false;
    this.viewRealEstate = true;
    this.realEstate = row;
    this.realEstate.city = {
      idcity: row.city.idcity,
      name: row.city.name
    }
  }

  viewForAd(row){
    this.createRealEstate = false;
    this.updateRealEstate = false;
    this.viewRealEstate = true;
    this.realEstate = row;
    this.realEstate.city = {
      idcity: row.city.idcity,
      name: row.city.name
    }
    this.rentService.create(row);
    this.sellService.create(row);
  }

  update(row){
    this.createRealEstate = false;
    this.updateRealEstate = true;
    this.viewRealEstate = false;
    this.realEstate = row;
  }

  create(){
    this.createRealEstate = true;
    this.updateRealEstate = false;
    this.viewRealEstate = false;
  }
}
