import { Component, OnInit } from '@angular/core';
import { RealEstateAdSellFormService } from '../shared/real-estate-ad-sell-form.service';
import { MatDialogRef } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { RealEstateFormService } from '../shared/real-estate-form.service';
import { TypeRealEstate } from '../model/type-real-estate.enum';
import { StatusRealEstateAd } from '../model/status-real-estate-ad.enum';
import { City } from '../model/city';
import { ErrorMessagesService } from '../shared/error-messages.service';

@Component({
  selector: 'app-real-estate-ad-sell-dialog',
  templateUrl: './real-estate-ad-sell-dialog.component.html',
  styleUrls: ['./real-estate-ad-sell-dialog.component.scss']
})
export class RealEstateAdSellDialogComponent implements OnInit {
  types = TypeRealEstate;
  keys: any[];
  statuses = StatusRealEstateAd;
  keysStatus : any[];
  cities: City[] = [];

  constructor(private service: RealEstateAdSellFormService, public dialogRef: MatDialogRef<RealEstateAdSellDialogComponent>, 
    private api: ApiService, private notif: NotificationsService, private serviceRealEstate: RealEstateFormService,
    private errorService: ErrorMessagesService) { 
    this.keys = Object.keys(this.types).filter(k=>!isNaN(Number(k)));
    this.keysStatus = Object.keys(this.statuses).filter(k=>!isNaN(Number(k)));
    
  }

  ngOnInit() {
    this.serviceRealEstate.view(this.service.adSell.realEstate);
    this.serviceRealEstate.ad = true;
  }


  saveOrUpdate(){
    if(this.service.createAdSell){
      this.api.saveAdSell(this.service.adSell).subscribe(
        res => {
          this.notif.succes('Sell Ad succesfully saved');
          this.close();
        }, 
        err => {
          this.notif.warn(err.error.message);
        }
      );
    }else if(this.service.updateAdSell){
      this.api.updateAdSell(this.service.adSell).subscribe(
        res => {
          this.notif.succes('Sell Ad succesfully updated');
          this.close();
        }, 
        err => {
          this.notif.warn(err.error.message);
        }
      );
    }
  }


  close() {
    this.service.adSell = {
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
    this.serviceRealEstate.ad = false;
    this.dialogRef.close();
  }

}
