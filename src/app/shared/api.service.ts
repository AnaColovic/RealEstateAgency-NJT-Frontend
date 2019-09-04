import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { config } from '../config';
import { Observable } from 'rxjs';
import { RealEstate } from '../model/realEstate';
import { City } from '../model/city';
import { UserProfile } from '../model/userProfile';
import { RealEstateAdRent } from '../model/real-estate-ad-rent';
import { RealEstateAdSell } from '../model/real-estate-ad-sell';
import { ViewingAppointmentRent } from '../model/viewing-appointment-rent';
import { ViewingAppointmentSell } from '../model/viewing-appointment-sell';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (private http: HttpClient) { }
  userProfile: UserProfile = {
    username: '',
    password: '',
    roles: '',
    person: {
      id: 0,
    firstname: '',
    lastname: '',
    email: '',
    jmbg: '',
    phoneNumber: ''
    }
  };
  private LOGIN = `${config.apiUrl}/login`;
  private SIGN_UP = `${config.apiUrl}/signup`;
  private CONFIRM = `${config.apiUrl}/confirm-account`;

  private GET_ALL_CITIES = `${config.apiUrl}/city/get`;

  private GET_ALL_REALESTATES = `${config.apiUrl}/realestate/get`;
  private DELETE_REALESTATE = `${config.apiUrl}/realestate/delete/`;
  private SAVE_REALESTATE = `${config.apiUrl}/realestate/save`;
  private UPDATE_REALESTATE = `${config.apiUrl}/realestate/update`;

  private DELETE_AD_RENT = `${config.apiUrl}/rent/delete/`;
  private GET_ALL_AD_RENT = `${config.apiUrl}/rent/get`;
  private SAVE_AD_RENT = `${config.apiUrl}/rent/save`;
  private UPDATE_AD_RENT = `${config.apiUrl}/rent/update/`;
  private SEARCH_AD_RENT = `${config.apiUrl}/rent/search`;
  private GET_ONE_AD_RENT = `${config.apiUrl}/rent/get/`;

  private DELETE_AD_SELL = `${config.apiUrl}/sell/delete/`;
  private GET_ALL_AD_SELL = `${config.apiUrl}/sell/get`;
  private SAVE_AD_SELL = `${config.apiUrl}/sell/save`;
  private UPDATE_AD_SELL = `${config.apiUrl}/sell/update/`;
  private SEARCH_AD_SELL = `${config.apiUrl}/sell/search`;
  private GET_ONE_AD_SELL = `${config.apiUrl}/sell/get/`;

  private SAVE_VIEWING_APPOINTMENT = `${config.apiUrl}/appointment/save/`;
  private GET_VIEWING_APPOINTMENTS = `${config.apiUrl}/appointment/get`;
  private DELETE_VIEWING_APPOINTMENT = `${config.apiUrl}/appointment/delete/`;


  login(username: string , password: string, contentHeader: HttpHeaders): Observable<any>{
    return this.http.post<any>(this.LOGIN, { username, password }, { headers: contentHeader, observe: 'response' });
  }

  signUp(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.post<UserProfile>(this.SIGN_UP, userProfile);
  }

  confirm(params: HttpParams): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.CONFIRM, {params});
  }

  getAllRealestates(): Observable<RealEstate[]>{
    return this.http.get<RealEstate[]>(this.GET_ALL_REALESTATES);
  }

  deleteRealEstate(id: number): Observable<any>{
    return this.http.delete(this.DELETE_REALESTATE + id);
  }

  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>(this.GET_ALL_CITIES);
  }

  saveRealEstate(formData: FormData): Observable<RealEstate>{
    return this.http.post<RealEstate>(this.SAVE_REALESTATE, formData);
  }

  updateRealEstate(formData: FormData): Observable<RealEstate>{
    return this.http.put<RealEstate>(this.UPDATE_REALESTATE, formData);
  }

  deleteAdRent(id: number): Observable<any>{
    return this.http.delete(this.DELETE_AD_RENT + id);
  }

  getAllRentAds(): Observable<RealEstateAdRent[]>{
    return this.http.get<RealEstateAdRent[]>(this.GET_ALL_AD_RENT);
  }

  saveAdRent(adRent: RealEstateAdRent): Observable<RealEstateAdRent>{
    return this.http.post<RealEstateAdRent>(this.SAVE_AD_RENT, adRent);
  }

  updateAdRent(adRent: RealEstateAdRent): Observable<RealEstateAdRent>{
    return this.http.put<RealEstateAdRent>(this.UPDATE_AD_RENT + adRent.id, adRent);
  }

  searchAdRent(params: HttpParams): Observable<RealEstateAdRent[]>{
    return this.http.get<RealEstateAdRent[]>(this.SEARCH_AD_RENT, {params});
  }

  getOneAdRent(id: string): Observable<RealEstateAdRent>{
    return this.http.get<RealEstateAdRent>(this.GET_ONE_AD_RENT+id);
  }

  deleteAdSell(id: number): Observable<any>{
    return this.http.delete(this.DELETE_AD_SELL + id);
  }

  getAllSellAds(): Observable<RealEstateAdSell[]>{
    return this.http.get<RealEstateAdSell[]>(this.GET_ALL_AD_SELL);
  }

  saveAdSell(adSell: RealEstateAdSell): Observable<RealEstateAdSell>{
    return this.http.post<RealEstateAdSell>(this.SAVE_AD_SELL, adSell);
  }

  updateAdSell(adSell: RealEstateAdSell): Observable<RealEstateAdSell>{
    return this.http.put<RealEstateAdSell>(this.UPDATE_AD_SELL + adSell.id, adSell);
  }

  searchAdSell(params: HttpParams): Observable<RealEstateAdSell[]>{
    return this.http.get<RealEstateAdSell[]>(this.SEARCH_AD_SELL, {params});
  } 
  
  getOneAdSell(id: string): Observable<RealEstateAdSell>{
    return this.http.get<RealEstateAdSell>(this.GET_ONE_AD_SELL+id);
  }

  saveViewingAppointmentRent(appointment: ViewingAppointmentRent, id: string):Observable<ViewingAppointmentRent>{
    return this.http.post<ViewingAppointmentRent>(this.SAVE_VIEWING_APPOINTMENT + id, appointment);
  }

  saveViewingAppointmentSell(appointment: ViewingAppointmentSell, id: string):Observable<ViewingAppointmentSell>{
    return this.http.post<ViewingAppointmentSell>(this.SAVE_VIEWING_APPOINTMENT + id, appointment);
  }

  getViewingAppointmentsSell(): Observable<ViewingAppointmentSell[]>{
    return this.http.get<ViewingAppointmentSell[]>(this.GET_VIEWING_APPOINTMENTS);
  }

  getViewingAppointmentsRent(): Observable<ViewingAppointmentRent[]>{
    return this.http.get<ViewingAppointmentRent[]>(this.GET_VIEWING_APPOINTMENTS);
  }

  deleteViewingAppointment(id: string): Observable<any>{
    return this.http.delete(this.DELETE_VIEWING_APPOINTMENT+ id);
  }

}
