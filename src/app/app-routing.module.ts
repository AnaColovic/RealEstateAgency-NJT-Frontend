import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { RentComponent } from './rent/rent.component';
import { SellComponent } from './sell/sell.component';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { AdsComponent } from './ads/ads.component';
import { RentAdViewComponent } from './rent/rent-card/rent-ad-view/rent-ad-view.component';
import { SellAdViewComponent } from './sell/sell-card/sell-ad-view/sell-ad-view.component';
import { ConfirmVerificationTokenComponent } from './confirm-verification-token/confirm-verification-token.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
    },
  {
    path: 'rent',
    component: RentComponent
  },
  {
    path: 'sell',
    component: SellComponent
  },
  {
    path: 'realestates',
    component: RealEstatesComponent
  },
  {
    path: 'ads',
    component: AdsComponent
  },
  {
    path: 'rent/:id',
    component: RentAdViewComponent
  },
  {
    path: 'sell/:id',
    component: SellAdViewComponent
  },
  {
    path: 'confirm-account',
    component: ConfirmVerificationTokenComponent,
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
