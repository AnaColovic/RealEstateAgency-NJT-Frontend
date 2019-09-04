import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstateAdRent } from 'src/app/model/real-estate-ad-rent';
import { ApiService } from 'src/app/shared/api.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-rent-ad-view',
  templateUrl: './rent-ad-view.component.html',
  styleUrls: ['./rent-ad-view.component.scss']
})
export class RentAdViewComponent implements OnInit {
  id: string;
  rentAd: RealEstateAdRent = {
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
    rentprice: 0,
    minimummonths: 0
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
    this.api.getOneAdRent(this.id).subscribe(
      res => {
        this.rentAd = res;
        console.log(res);
      },
      err => {
        this.notif.warn('Rent Ad could not be found');
      }
    )
  }

}
