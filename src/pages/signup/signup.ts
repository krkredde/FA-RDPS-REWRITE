import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,MenuController,LoadingController, AlertController } from 'ionic-angular';

import { UserRegistration } from '../../interfaces/user-registration';

import {Http,Headers, RequestOptions} from '@angular/http';

import { SignupSuccessfulPage } from '../signup-successful/signup-successful';

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

 
let registerUrl = "http://192.168.0.161:8080/smartgenie/signup";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserRegistration = { emailId: '', name: '',password:'',Roles:'' };
  submitted = false;

  constructor(
    public navCtrl: NavController, 
    private menu:MenuController,
    public loadingCtrl: LoadingController,
    private http: Http,
    private alertCtrl: AlertController
    ){}

   ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }


  onSignup(form: NgForm) {
    
    const loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please Wait..."
    });


    this.submitted = true;

    if (form.valid) {

      let postdata={
        
        emailId: this.signup.emailId,
        name: this.signup.name,
        password: this.signup.password,
        Roles: this.signup.Roles
        

      };

      console.log(postdata);

      loading.present();

      this.http.post(registerUrl, postdata, options).map(res => res.json())
        .subscribe(data => {
          console.log(data.responseBean);
          if(data.statusCode == '0'){ // && data.responseBean != undefined){
            console.log(data.statusCode);
                loading.dismiss();
                console.log(data.responseBean);
                this.navCtrl.push(SignupSuccessfulPage);
                console.log("Success");
// ,{fullname:this.signup.fullname});
              }
              else{
                console.log("Else");
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: 'There was an error occurred while registering',
                  buttons:['OK']
                });
                alert.present();
              }
            },
            err => {
              if(err){
              loading.dismiss(); 
              }
              console.log("ERROR!: ", err);
            }
        );
     
      
    }


  }


}
