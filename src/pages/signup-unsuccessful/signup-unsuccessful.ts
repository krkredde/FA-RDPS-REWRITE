import { Component } from '@angular/core';
import { LoginPage } from '../login/login';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'signup-successful',
  templateUrl: 'signup-unsuccessful.html'
})
export class SignupUnsuccessfulPage {
  
  submitted = false;
  constructor(public navCtrl: NavController) {}

  backToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
