import { Component, OnInit } from '@angular/core';
import { TypeRealEstate } from '../model/type-real-estate.enum';
import { RealEstate } from '../model/realEstate';
import { RealEstateFormService } from '../shared/real-estate-form.service';
import { MatDialogRef } from '@angular/material';
import { City } from '../model/city';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { ErrorMessagesService } from '../shared/error-messages.service';

@Component({
  selector: 'app-real-estate-dialog',
  templateUrl: './real-estate-dialog.component.html',
  styleUrls: ['./real-estate-dialog.component.scss']
})
export class RealEstateDialogComponent implements OnInit {
  types = TypeRealEstate;
  keys: any[];
  cities: City[] = [];
  realEstateImg : any = File;
  valid = true;
  selectedCity: City = {
    idcity: 0,
    name: ''
  };
  change = false;

  constructor(private service: RealEstateFormService, public dialogRef: MatDialogRef<RealEstateDialogComponent>, private api: ApiService, 
              private notif: NotificationsService, private errorService: ErrorMessagesService) { 
    this.keys = Object.keys(this.types).filter(k=>!isNaN(Number(k)));
  }

  ngOnInit() {
    console.log(this.service.realEstate.city);
    this.getAllCities();
    if(this.service.createRealEstate){
    this.service.realEstate.fileImg = '../../assets/img/download.png';
    }
    if(this.service.updateRealEstate){
      if(this.service.realEstate.fileImg!= null){
      const base64 = this.service.realEstate.fileImg.split(';')[1].split(',')[1];
      const format = this.service.realEstate.fileImg.split(';')[0].split(':')[1];
      console.log(base64);
      console.log(format);
      const imageBlob = this.dataURItoBlob(base64,format);
      this.realEstateImg = new File([imageBlob], this.service.realEstate.fileName, { type: format });

    }
  }
  }

  onSelectFile(event){
    this.change = true;
    const file = event.target.files[0];
    console.log(file);
    this.realEstateImg = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.service.realEstate.fileImg = e.target.result;
    };
    reader.readAsDataURL(this.realEstateImg);
  }

  getAllCities(){
    this.api.getAllCities().subscribe(
      res => {
        this.cities = res;
        this.selectedCity = this.cities[0];

      },
      err => {
        this.notif.warn(err.error.message);
      }
    )
  }

  saveOrUpdate(){
    if(this.service.updateRealEstate){
     this.update();
    } else if(this.service.createRealEstate){
     this.save();
    }
  }


  dataURItoBlob(dataURI, format) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: format });    
    return blob;
 }

 save(){
  this.service.realEstate.city = this.selectedCity;
  console.log(this.service.realEstate);
  const formData = new FormData();
  formData.append('realEstate', JSON.stringify(this.service.realEstate));
  formData.append('realEstateImg', this.realEstateImg);
  this.api.saveRealEstate(formData).subscribe(
    res => {
      this.notif.succes('Real estate succesfully saved');
      this.close();
    },
    err => {
      this.notif.warn(err.error.message);
    }
  );
 }

  update(){
    if(this.change === true){
      this.service.realEstate.fileName = '';
    }
    this.service.realEstate.city = this.selectedCity;
    const formData = new FormData();
    formData.append('realEstate', JSON.stringify(this.service.realEstate));
    formData.append('realEstateImg', this.realEstateImg);
    this.api.updateRealEstate(formData).subscribe(
       res => {
         this.notif.succes('Real estate succesfully updated');
         this.close();
       },
       err => {
         this.notif.warn(err.error.message);
       }
     )
  }

  close() {
    this.service.realEstate = {
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
      }
    this.dialogRef.close();
  }

}
