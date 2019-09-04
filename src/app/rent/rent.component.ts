import { Component, OnInit } from '@angular/core';
import { RealEstateAdRent } from '../model/real-estate-ad-rent';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  rentAds: RealEstateAdRent[] = [];

  constructor(private api: ApiService, private notif: NotificationsService) { }

  ngOnInit() {
    this.getAll();
  }

  updateSearch(rentAds: RealEstateAdRent[]){
      this.rentAds = rentAds;
  }

  getAll(){
    this.api.getAllRentAds().subscribe(
      res => {
        res.forEach(element => {
          if(element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.APPROVED]){
            this.rentAds.push(element);
          }
        });
      },
      err => {
        this.notif.warn('Rent Ads could not be loaded');

      }
    )
  }

}
