import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { AppComponent } from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { RentComponent } from './rent/rent.component';
import { SellComponent } from './sell/sell.component';
import { HomeComponent } from './home/home.component';
import { RealEstatesComponent } from './real-estates/real-estates.component';
import { RealEstateDialogComponent } from './real-estate-dialog/real-estate-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {AuthModule} from './auth/auth.module';
import { RealEstateAdRentComponent } from './real-estate-ad-rent/real-estate-ad-rent.component';
import { RealEstateAdSellComponent } from './real-estate-ad-sell/real-estate-ad-sell.component';
import { AdsComponent } from './ads/ads.component';
import { RealEstateAdRentDialogComponent } from './real-estate-ad-rent-dialog/real-estate-ad-rent-dialog.component';
import { RealEstateAdSellDialogComponent } from './real-estate-ad-sell-dialog/real-estate-ad-sell-dialog.component';
import { RentCardComponent } from './rent/rent-card/rent-card.component';
import { SearchBarComponent } from './rent/search-bar/search-bar.component';
import { SellCardComponent } from './sell/sell-card/sell-card.component';
import { SearchBarSellComponent } from './sell/search-bar-sell/search-bar-sell.component';
import { RentAdViewComponent } from './rent/rent-card/rent-ad-view/rent-ad-view.component';
import { AgmCoreModule } from '@agm/core';
import { ViewingAppointmentComponent } from './rent/rent-card/rent-ad-view/viewing-appointment/viewing-appointment.component';
import { SellAdViewComponent } from './sell/sell-card/sell-ad-view/sell-ad-view.component';
import { ViewingAppointmentSellComponent } from './sell/sell-card/sell-ad-view/viewing-appointment-sell/viewing-appointment-sell.component';
import { DatePipe } from '@angular/common';
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
import { ConfirmVerificationTokenComponent } from './confirm-verification-token/confirm-verification-token.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RentComponent,
    SellComponent,
    HomeComponent,
    RealEstatesComponent,
    RealEstateDialogComponent,
    DeleteDialogComponent,
    RealEstateAdRentComponent,
    RealEstateAdSellComponent,
    AdsComponent,
    RealEstateAdRentDialogComponent,
    RealEstateAdSellDialogComponent,
    RentCardComponent,
    SearchBarComponent,
    SellCardComponent,
    SearchBarSellComponent,
    RentAdViewComponent,
    ViewingAppointmentComponent,
    SellAdViewComponent,
    ViewingAppointmentSellComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ConfirmVerificationTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  BrowserAnimationsModule,
  MaterialModule,
  AuthModule,
  MatFileUploadModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAt4Z98Bd9OnxxKqmC6MJAoTGdsRx6ylXE'
  })
  ],
  entryComponents: [RealEstateDialogComponent, DeleteDialogComponent, RealEstateAdRentDialogComponent, RealEstateAdSellDialogComponent, LoginDialogComponent, SignUpDialogComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
