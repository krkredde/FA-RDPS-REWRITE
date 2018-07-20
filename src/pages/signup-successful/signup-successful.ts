import { Component } from '@angular/core';
import { LoginPage } from '../login/login';

import { NavController,NavParams } from 'ionic-angular';


@Component({
  selector: 'signup-successful',
  templateUrl: 'signup-successful.html'
})
export class SignupSuccessfulPage {
  fullname:string;
  submitted = false;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
  	this.fullname = this.navParams.get('fullname');
  }

  backToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
