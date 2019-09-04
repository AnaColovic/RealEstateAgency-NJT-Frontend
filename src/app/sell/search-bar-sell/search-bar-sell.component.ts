import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RealEstateAdSell } from 'src/app/model/real-estate-ad-sell';
import { TypeRealEstate } from 'src/app/model/type-real-estate.enum';
import { City } from 'src/app/model/city';
import { ApiService } from 'src/app/shared/api.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';

@Component({
  selector: 'app-search-bar-sell',
  templateUrl: './search-bar-sell.component.html',
  styleUrls: ['./search-bar-sell.component.scss']
})
export class SearchBarSellComponent implements OnInit {
  cities: City[] = [];
  city: City = {
    idcity: 0,
    name: ''
  };
  rooms: string = '0';
  minPrice: string = '0';
  maxPrice: string = '0';
  minArea: string = '0';
  maxArea: string = '0';
  type: TypeRealEstate = -1;
  types = TypeRealEstate;
  keys: any[];

  @Input() sellAds: RealEstateAdSell[];
  @Output() search: EventEmitter<RealEstateAdSell[]> = new EventEmitter<RealEstateAdSell[]>();

  constructor(private api: ApiService, private notif: NotificationsService) { 
    this.keys = Object.keys(this.types).filter(k => !isNaN(Number(k)));

  }

  ngOnInit() {
    this.getAllCities();
  }

  searchSellAds() {
    if (typeof this.city.idcity === 'undefined'){
      this.city.idcity = 0;
    }
    if (typeof this.type === 'undefined'){
      this.type = -1;
    }
    if(this.rooms === null){this.rooms = '0';}
    if(this.minArea === null){this.minArea = '0'}
    if(this.maxArea === null){this.maxArea = '0'}
    if(this.minPrice === null){this.minPrice = '0'}
    if(this.maxPrice === null){this.maxPrice = '0'}
    const params = new HttpParams().set('idcity', this.city.idcity + '').set('rooms', this.rooms)
    .set('type', this.type + '').set('minPrice', this.minPrice)
    .set('maxPrice', this.maxPrice).set('minArea', this.minArea).set('maxArea', this.maxArea); 

    this.api.searchAdSell(params).subscribe(
      res => {
        this.sellAds = [];
        res.forEach(element => {
          if(element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.APPROVED]){
            this.sellAds.push(element);
          }
        });
        console.log(this.sellAds);
        this.search.emit(this.sellAds);
      },
      err => {

      }
    );

  }

  
  getAllCities() {
    this.api.getAllCities().subscribe(
      res => {
        this.cities = res;
      },
      err => {
        this.notif.warn('Cities could not be loaded');
      }
    );
  }

  emptyFields(){
    this.city = {
      idcity: 0,
      name: ''
    };
    this.rooms = '0';
    this.minPrice = '0';
    this.maxPrice = '0';
    this.minArea = '0';
    this.maxArea = '0';
    this.type = -1;
  }

}
