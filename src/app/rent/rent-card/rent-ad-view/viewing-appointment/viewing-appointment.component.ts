import { Component, OnInit, Input } from '@angular/core';
import { ViewingAppointmentRent } from 'src/app/model/viewing-appointment-rent';
import { ApiService } from 'src/app/shared/api.service';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DeleteService } from 'src/app/shared/delete.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-viewing-appointment',
  templateUrl: './viewing-appointment.component.html',
  styleUrls: ['./viewing-appointment.component.scss']
})
export class ViewingAppointmentComponent implements OnInit {
  minDate = new Date();
  view: ViewingAppointmentRent = {
    id : 0,
    date: new Date(),
    client: JSON.parse(localStorage.getItem('client')),
    realEstateAd: {
      id :0,
      creationDate: null,
      description: '',
      minimummonths: 0,
      rentprice: 0,
      status: StatusRealEstateAd.NOT_APPROVED,
      realEstate: {
        adress: '',
        area: 0,
        city: {
          idcity: 0,
          name: ''
        },
        description: '',
        fileName: '',
        floor: 0,
        idrealestate: 0,
        owner: null,
        rooms: 0,
        type: null,
        fileImg: ''
      }
    }
  };
  hasAppointment: boolean = false;
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  constructor(private api: ApiService, private notif: NotificationsService, private router: Router, private datePipe: DatePipe,
    private deleteService: DeleteService, private dialog: MatDialog) {
   }

  ngOnInit() {
    this.prepare();
    console.log(this.hasAppointment);
  }

  save(){
    console.log(this.view);
    console.log(this.router.url.split('/')[this.router.url.split('/').length-1]);
    this.api.saveViewingAppointmentRent(this.view, this.router.url.split('/')[this.router.url.split('/').length-1]
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
              this.view = {
                id : 0,
                date: new Date(),
                client: JSON.parse(localStorage.getItem('client')),
                realEstateAd: {
                  id :0,
                  creationDate: null,
                  description: '',
                  minimummonths: 0,
                  rentprice: 0,
                  status: StatusRealEstateAd.NOT_APPROVED,
                  realEstate: {
                    adress: '',
                    area: 0,
                    city: {
                      idcity: 0,
                      name: ''
                    },
                    description: '',
                    fileName: '',
                    floor: 0,
                    idrealestate: 0,
                    owner: null,
                    rooms: 0,
                    type: null,
                    fileImg: ''
                  }
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
    this.api.getViewingAppointmentsRent().subscribe(
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
