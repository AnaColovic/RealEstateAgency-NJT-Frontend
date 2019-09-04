import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/model/city';
import { TypeRealEstate } from 'src/app/model/type-real-estate.enum';
import { ApiService } from 'src/app/shared/api.service';
import { RealEstateAdRent } from 'src/app/model/real-estate-ad-rent';
import { HttpParams } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
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

  @Input() rentAds: RealEstateAdRent[];
  @Output() search: EventEmitter<RealEstateAdRent[]> = new EventEmitter<RealEstateAdRent[]>();

  constructor(private api: ApiService, private notif: NotificationsService) {
    this.keys = Object.keys(this.types).filter(k => !isNaN(Number(k)));
   }

  ngOnInit() {
    this.getAllCities();
  }

  searchRentAds() {
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

    this.api.searchAdRent(params).subscribe(
      res => {
        console.log(res);
        this.rentAds = [];
        res.forEach(element => {
          if(element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.APPROVED]){
            this.rentAds.push(element);
          }
        });
        this.search.emit(this.rentAds);
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

}
