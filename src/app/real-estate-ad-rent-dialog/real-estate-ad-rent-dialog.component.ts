import { Component, OnInit } from '@angular/core';
import { RealEstateAdRentFormService } from '../shared/real-estate-ad-rent-form.service';
import { MatDialogRef } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { TypeRealEstate } from '../model/type-real-estate.enum';
import { City } from '../model/city';
import { RealEstateFormService } from '../shared/real-estate-form.service';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';
import { ErrorMessagesService } from '../shared/error-messages.service';

@Component({
  selector: 'app-real-estate-ad-rent-dialog',
  templateUrl: './real-estate-ad-rent-dialog.component.html',
  styleUrls: ['./real-estate-ad-rent-dialog.component.scss']
})
export class RealEstateAdRentDialogComponent implements OnInit {
  types = TypeRealEstate;
  keys: any[];
  statuses = StatusRealEstateAd;
  keysStatus : any[];
  cities: City[] = [];

  constructor(private service: RealEstateAdRentFormService, public dialogRef: MatDialogRef<RealEstateAdRentDialogComponent>,
    private api: ApiService, private notif: NotificationsService, private serviceRealEstate: RealEstateFormService,
    private errorService: ErrorMessagesService) {
    this.keys = Object.keys(this.types).filter(k=>!isNaN(Number(k)));
    this.keysStatus = Object.keys(this.statuses).filter(k=>!isNaN(Number(k)));

  }

  ngOnInit() {
    // if(!this.serviceRealEstate.viewAd){
    //   this.serviceRealEstate.view(this.service.adRent.realEstate);
    // }
    this.serviceRealEstate.view(this.service.adRent.realEstate);
    this.serviceRealEstate.ad = true;
  }

  saveOrUpdate() {

if(this.service.createAdRent) {
  this.api.saveAdRent(this.service.adRent).subscribe(
    res => {
      this.notif.succes('Rent Ad succesfully saved');
      this.close();
    },
    err => {
      this.notif.warn(err.error.message);
    }
  );
} else if(this.service.updateAdRent) {
    this.api.updateAdRent(this.service.adRent).subscribe(
      res => {
        this.notif.succes('Rent Ad succesfully updated');
        this.close();
      },
      err => {
        this.notif.warn(err.error.message);
      }
    );
}
  }


  close() {
    this.service.adRent = {
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
      minimummonths: 0,

    };
    this.serviceRealEstate.ad = false;
    this.dialogRef.close();
  }


}
