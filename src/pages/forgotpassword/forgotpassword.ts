import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';
//import { UserOptions } from '../../interfaces/user-options';
import { UserRegistration } from '../../interfaces/user-registration';
import { NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import { LoginPage } from '../login/login';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
let url = "http://192.168.0.161:8080/smartgenie/forgotPwd";


@Component({
  selector: 'page-user',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  
 // url: String = 'auth/frgtpwd/';
  signup: UserRegistration = { emailId: '', name: '',password:'',Roles:'' };
  submitted: boolean = false;

  constructor(public navCtrl: NavController, 
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  onForgotPassword(form: NgForm){
    if(form.valid){
      let postdata={
        
        emailId: this.signup.emailId
      };
      console.log(postdata);
        //var emailId = this.signup.emailId;
        this.http.post(url, postdata, options).map(res => res.json())
        .subscribe(data => {
          console.log(data.responseBean);
          console.log(data.statusCode);
            if(data.statusCode == '0' && data.responseBean != undefined){
              if(data.responseBean.enabled == "true"){
                let alert = this.alertCtrl.create({
                  title: 'Alert!',
                  subTitle: 'Your password is sent to your registered email address.',
                  buttons: 
                  [
                    {
                      text: 'Back to login',
                        handler: () => {
                          this.navCtrl.push(LoginPage);
                        }
                    }
                ]
                });
                alert.present();
                // let prompt = this.alrtCtrl.create({
                //   title: 'Enter pin!',
                //   message: "A security pin is sent to your registered email address. Enter the pin",
                //   inputs: [
                //     {
                //       name: 'pin',
                //       placeholder: 'pin'
                //     },
                //   ],
                //   buttons: [
                //     {
                //       text: 'Cancel',
                //       handler: data => {
                //         console.log('Cancel clicked');
                //       }
                //     },
                //     {
                //       text: 'Submit',
                //       handler: data => {
                //         console.log('Saved clicked');
                //       }
                //     }
                //   ]
                // });
                // prompt.present();
                //this.navCtrl.push();    // todo: navigate to reset password page
              }
            }
            else{
              let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'The entered mobile number is not found!',
                buttons: ['OK']
              });
              alert.present();
            }
        });
    }
  }

}
