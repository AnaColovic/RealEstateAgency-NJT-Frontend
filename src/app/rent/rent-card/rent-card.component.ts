import { Component, OnInit, Input, Output } from '@angular/core';
import { RealEstateAdRent } from 'src/app/model/real-estate-ad-rent';
import { Router } from '@angular/router';
import { StatusRealEstateAd } from 'src/app/model/status-real-estate-ad.enum';

@Component({
  selector: 'app-rent-card',
  templateUrl: './rent-card.component.html',
  styleUrls: ['./rent-card.component.scss']
})
export class RentCardComponent implements OnInit {

  @Input() rentAd: RealEstateAdRent = {
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  info(){
    this.router.navigate(['/rent/'+this.rentAd.id]);
  }

}
