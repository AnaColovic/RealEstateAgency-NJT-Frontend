import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  REQUIRED_MESSAGE = 'This field is required!';
  PASSWORD_MESSAGE = 'This field must contains 6 characters!';
  ONLY_LETTERS_MESSAGE = 'This filed must only contains letters!';
  ONLY_NUMBERS_MESSAGE = 'This field must only containts numbers!';
  JMBG_MESSAGE = 'This field must be 13 characters long!';
  EMAIL_MESSAGE = 'This field must be a valid email adress!';


  constructor() { }
}
