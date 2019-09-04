import { Component, OnInit } from '@angular/core';
import { RealEstateAdSell } from '../model/real-estate-ad-sell';
import { ApiService } from '../shared/api.service';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { NotificationsService } from '../shared/notifications.service';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  sellAds: RealEstateAdSell[] = [];

  constructor(private api: ApiService, private notif: NotificationsService) { }

  ngOnInit() {
    this.getAll();
  }

  updateSearch(sellAds: RealEstateAdSell[]){
    this.sellAds = sellAds;
  }

  getAll(){
    this.api.getAllSellAds().subscribe(
      res => {
        res.forEach(element => {
          if(element.status.toString() === StatusRealEstateAd[StatusRealEstateAd.APPROVED]){
            this.sellAds.push(element);
          }
        });
      },
      err => {
        this.notif.warn('Sell Ads could not be loaded');

      }
    )
  }

}
