import { Component, OnInit, Input } from '@angular/core';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';
import { ViewingAppointmentRent } from 'src/app/model/viewing-appointment-rent';
import { RealEstateAdSell } from 'src/app/model/real-estate-ad-sell';
import { ViewingAppointmentSell } from 'src/app/model/viewing-appointment-sell';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { DeleteService } from 'src/app/shared/delete.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-viewing-appointment-sell',
  templateUrl: './viewing-appointment-sell.component.html',
  styleUrls: ['./viewing-appointment-sell.component.scss']
})
export class ViewingAppointmentSellComponent implements OnInit {
  minDate = new Date();
  view: ViewingAppointmentSell = {
    id: 0,
    date: new Date(),
    client: JSON.parse(localStorage.getItem("client")),
    realEstateAd: {
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
  };
  hasAppointment = false;

  constructor(private api: ApiService, private router: Router, private notif: NotificationsService,
    private deleteService: DeleteService, private dialog: MatDialog) {
   }

  ngOnInit() {
    this.prepare();
  }

  save(){
    console.log(this.view);
    console.log(this.router.url.split('/')[this.router.url.split('/').length-1]);
    this.api.saveViewingAppointmentSell(this.view, this.router.url.split('/')[this.router.url.split('/').length-1]
    ).subscribe(
      res => {
        this.notif.succes('Viewing appointment succesfully saved');
        console.log(res);
        let date = this.view.date;
        this.view = res;
        this.view.date = date;
        this.hasAppointment = true;
      },
      err => {
        this.notif.warn(err.error.message);
      }
    )
  }

  openConfigDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '5%' },
      disableClose: true
    });
  }

  delete(){
    this.deleteService.message = 'Are you sure you want to cancel this viewing appointment?';
    this.openConfigDialog().afterClosed().subscribe(
      res => {
        if(res){
          this.api.deleteViewingAppointment(this.view.id+"").subscribe(
            () => {
              this.notif.succes('Viewing appointment succesfully deleted');
              this.hasAppointment = false;
              this.view =  {
                id: 0,
                date: new Date(),
                client: JSON.parse(localStorage.getItem("client")),
                realEstateAd: {
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
              };
            },
            err => {
              this.notif.warn(err.error.message);
            }
          )
        }
      }
    );
  
  }


  
  prepare(){
    this.api.getViewingAppointmentsSell().subscribe(
      res => {
        res.forEach(element => {
          if(element.client.id === JSON.parse(localStorage.getItem('client')).id && 
          element.realEstateAd.id+"" === this.router.url.split('/')[this.router.url.split('/').length-1]){
            this.hasAppointment = true;
            this.view = element;
                    }
        });
      },
      err => {

      }
    );
  }


}
