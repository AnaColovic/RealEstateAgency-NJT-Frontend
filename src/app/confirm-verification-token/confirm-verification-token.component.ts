import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { HttpParams } from '@angular/common/http';
import { NotificationsService } from '../shared/notifications.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';

@Component({
  selector: 'app-confirm-verification-token',
  templateUrl: './confirm-verification-token.component.html',
  styleUrls: ['./confirm-verification-token.component.scss']
})
export class ConfirmVerificationTokenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private notif: NotificationsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    const firstParam: string = this.route.snapshot.queryParamMap.get('token');
    console.log(firstParam);
    const params : HttpParams = new HttpParams().set('token',firstParam);
    this.api.confirm(params).subscribe(
      res => {
        this.notif.succes('Account succesfully confirmed');
        this.router.navigate(['/home']);
        this.openDialogLogIn();
      },
      err => {
        this.notif.warn(err.error.message);
      }
    );
  }

  openDialogLogIn(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

}
