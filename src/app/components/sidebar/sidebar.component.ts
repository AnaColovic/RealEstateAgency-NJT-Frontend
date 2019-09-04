import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginDialogComponent } from 'src/app/auth/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { SignUpDialogComponent } from 'src/app/sign-up-dialog/sign-up-dialog.component';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'home', class: true },
    {path: '/rent', title: 'Rent', icon: '', class: true },
    { path: '/sell', title: 'Sell',  icon:'', class: true },
    {path: '/realestates', title: 'My Real Estates', icon: '', class: false},
    {path: '/ads', title: 'My Ads', icon: '', class: false},
    {path: '/ads', title: 'Ads', icon: '', class: false}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private dialog: MatDialog, private auth: AuthService, private router: Router) { 
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.auth.isLoggedIn());
    this.prepare();
   
  }

  openDialogLogIn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

  openDialogSignUp(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SignUpDialogComponent, dialogConfig);
  }

  logOut(){
    localStorage.removeItem('userProfile');
    localStorage.removeItem('client');
    localStorage.removeItem('JWT_TOKEN');
    console.log(localStorage.getItem('JWT_TOKEN'));
    
    console.log(this.router.url);

    if(this.router.url === '/home' || this.router.url === ''){
      location.reload();
    } else {
      this.router.navigate(['/home']);
    }
    
  }

  prepare(){
    console.log(this.auth.isLoggedIn());
    if(this.auth.isLoggedIn()){
      if(JSON.parse(localStorage.getItem('userProfile')).roles === 'ADMIN'){
        this.menuItems[5].class = true;
      }
      if(JSON.parse(localStorage.getItem('userProfile')).roles === 'USER'){
        this.menuItems[3].class = true;
        this.menuItems[4].class = true;
      }
    } else {
      this.menuItems[3].class = false;
      this.menuItems[4].class = false;
      this.menuItems[5].class = false;
    }
  }
}