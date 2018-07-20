import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController,MenuController,LoadingController, AlertController } from 'ionic-angular';
import {Http,Headers, RequestOptions} from '@angular/http';
// import * as OktaAuth from '@okta/okta-auth-js';
//import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import { SignupSuccessfulPage } from '../signup-successful/signup-successful';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { UserRegistration } from '../../interfaces/user-registration';
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

//declare const window: any;

let registerUrl = "http://192.168.0.161:8080/smartgenie/login";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 signup: UserRegistration = { emailId: '', name: '',password:'',Roles:'' };
  submitted = false;

 // @ViewChild('email') email: any;
 // private username: string;
 // private password: string;
 // private error: string;

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


  onlogin(form: NgForm) {
    
    const loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please Wait..."
    });


    this.submitted = true;

    if (form.valid) {

      let postdata={
        
        emailId: this.signup.emailId,
        password: this.signup.password,
        
        

      };

      console.log(postdata);

      loading.present();

      this.http.post(registerUrl, postdata, options).map(res => res.json())
      .subscribe(data => {
        console.log(data.responseBean);
        if(data.statusCode == '0' && data.responseBean != undefined){
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
redirectLogin()
  {
  this.navCtrl.push(SignupPage);
  }
  
  forgotLogin()
  {
  this.navCtrl.push(ForgotpasswordPage);
  }


}