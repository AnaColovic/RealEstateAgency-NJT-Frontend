import { Component, OnInit, Input } from '@angular/core';
import { RealEstateAdSell } from 'src/app/model/real-estate-ad-sell';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-card',
  templateUrl: './sell-card.component.html',
  styleUrls: ['./sell-card.component.scss']
})
export class SellCardComponent implements OnInit {
  @Input() sellAd: RealEstateAdSell;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  info(){
    this.router.navigate(['/sell/'+this.sellAd.id]);
  }

}
