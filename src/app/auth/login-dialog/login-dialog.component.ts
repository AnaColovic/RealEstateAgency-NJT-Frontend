import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { ErrorMessagesService } from 'src/app/shared/error-messages.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  username: string;
  password: string;

  constructor(private auth: AuthService, private dialogRef: MatDialogRef<LoginDialogComponent>, 
    private errorService: ErrorMessagesService ,private notif: NotificationsService) { }

  ngOnInit() {
  }

  logIn(){
    this.auth.login(this.username, this.password).subscribe(
      (resp) => {
        console.log(resp);
        this.storeToken(resp.headers.get('Authorization').slice(7));
        localStorage.setItem("userProfile", JSON.stringify(resp.body));
        localStorage.setItem("client", JSON.stringify(resp.body.person));
        this.close();
        location.reload();
      },
      (err) => {
        this.notif.warn('Wrong username or password');
      }
    );
  }

  storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  close(){
    this.dialogRef.close();
  }

}
