import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactOfSomeoneTrusted } from './../../providers/dashboard/contact-of-someone-trusted';
/**
 * Generated class for the ContactOfSomeOneTrustedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// let registerUrl = "http://localhost:8090/smartgenie/saveEmergencyDtls";

@IonicPage()
@Component({
  selector: 'page-contact-of-some-one-trusted',
  templateUrl: 'contact-of-some-one-trusted.html',
})
export class ContactOfSomeOneTrustedPage {

  name: string = '';
  email: string = '';
  mobileNo: number;
  userEmail: string='anvitha@gmail.com';

  successResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private contactOfSomeoneTrusted: ContactOfSomeoneTrusted) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactOfSomeOneTrustedPage');
  }

  submitTrustedContact(){
    alert(this.userEmail);
    let reqObj = {
      "name":this.name,
      "email":this.email,
      "mobileno":this.mobileNo,
      "userEmail":this.userEmail,
      
    };
    console.log(reqObj);
    
    if(this.name!=='' && this.email!=='' && this.mobileNo){
      this.contactOfSomeoneTrusted.submitTrustedContacts(reqObj).then((data) => {
          this.successResponse = data;
alert(data);

        
      });
    } else{
      console.log('Please enter all fields');
    }
  }

}
