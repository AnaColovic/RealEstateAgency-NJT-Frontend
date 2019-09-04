import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/userProfile';
import { ApiService } from '../shared/api.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from '../shared/notifications.service';
import { ErrorMessagesService } from '../shared/error-messages.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent implements OnInit {
  userProfile: UserProfile = {
    password: '',
    username: '',
    roles: 'USER',
    person: {
      email: '',
      firstname: '',
      id: 0,
      jmbg: '',
      lastname: '',
      phoneNumber: ''
    }
  }

  constructor(private api: ApiService, private dialogRef: MatDialogRef<SignUpDialogComponent>, private errorService: ErrorMessagesService,
    private notif: NotificationsService) { }

  ngOnInit() {
  }

  
  close(){
    this.dialogRef.close();
  }

  signUp(){
    this.api.signUp(this.userProfile).subscribe(
      res => {
        this.notif.succes('Check your email for confirmation link');
       this.close();
      },
      err => {
        this.notif.warn(err.error.message);
      }
    )
  }
}
