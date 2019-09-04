import { Component, OnInit } from '@angular/core';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';
import { RealEstateAdSell } from 'src/app/model/real-estate-ad-sell';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sell-ad-view',
  templateUrl: './sell-ad-view.component.html',
  styleUrls: ['./sell-ad-view.component.scss']
})
export class SellAdViewComponent implements OnInit {
  id: string;
  sellAd: RealEstateAdSell = {
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
  };
  admin: boolean;

  constructor(private router: Router, private api: ApiService, private notif: NotificationsService, private auth: AuthService) {
  }

  ngOnInit(){
    if(this.auth.isLoggedIn()){
      if(JSON.parse(localStorage.getItem('userProfile')).roles === 'USER'){
        this.admin = false;
      } else {
        this.admin = true;

      }
    }else {
      this.admin = true;

    }
    console.log(this.router.url.split('/')[this.router.url.split('/').length-1]);
    this.id = this.router.url.split('/')[this.router.url.split('/').length-1];
    this.getOne();
  }

  getOne(){
    this.api.getOneAdSell(this.id).subscribe(
      res => {
        this.sellAd = res;
        console.log(res);
      },
      err => {
        this.notif.warn('Sell Ad could not be found');
      }
    )
  }

}
