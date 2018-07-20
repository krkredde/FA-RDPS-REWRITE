import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,MenuController,LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { PasswordChange } from '../../interfaces/password-change';
import {Http,Headers, RequestOptions} from '@angular/http';
import { LoginPage } from '../login/login'

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  let apiUrl="http://192.168.0.161:8090/smartgenie/changePassword?id=158&token=c6e64a45-f921-4e81-8d58-f6efb6bd7461";


@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html'

})
export class PasswordChangePage {

    chgpwd: PasswordChange = { oldPassword: '', newPassword: '',  password:'' };
    submitted = false;
    profile:any=[];
    password:String;

    constructor(
      public navCtrl: NavController,
      private menu:MenuController,
      public loadingCtrl: LoadingController,
      private http: Http,
      private alertCtrl: AlertController
      ){
      this.password = JSON.parse(localStorage.getItem('profile'));
          console.log(this.password);

       }

     ionViewDidEnter() {
      this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
      this.menu.swipeEnable(true);
    }

    onChgpwd(form: NgForm) {

      const loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please Wait change..."

      });


      this.submitted = true;

      if (form.valid) {

        let postdata={
          password:this.chgpwd.password
        };

        console.log('phhhh:',postdata);

        loading.present();
        console.log('entered' , apiUrl);
        this.http.post(apiUrl,postdata,options).map(res => res.json())
          .subscribe(data => {
            console.log('entered');
           console.log(data.statusCode);
                if(data.statusCode=="0"){
                 
                  loading.dismiss();

                  let alertct = this.alertCtrl.create({
                                      title: 'Success!',
                                      subTitle: 'Your Password has been Changed  ',
                                      buttons:['OK']
                                    });
                  alertct.present();
                  this.navCtrl.push(LoginPage);

                }
                else if(data.statusCode=="99"){
                 
                  loading.dismiss();

                  let alertct = this.alertCtrl.create({
                                      title: 'Fail!',
                                      subTitle: 'Check Enter Password ',
                                      buttons:['OK']
                                    });
                  alertct.present();
               
                }

                else{
                  alert(data.error);
                  loading.dismiss();
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
