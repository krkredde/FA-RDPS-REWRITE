import { Component } from '@angular/core';

import { AlertController, App, FabContainer, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { TypeOfInsurancePage } from '../type-Of-Insurance/type-Of-Insurance';
import { ClaimsPage } from '../claims/claims';



@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

 
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
 

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Home');
   }
   
   
   typeOfInsurance()
    {
    this.navCtrl.push(TypeOfInsurancePage);
    }

	oncomparePage()
    {
   // this.navCtrl.push(ValetPage);
    }
	
	onclaimsPage()
    {
    this.navCtrl.push(ClaimsPage);
    }
	
	ondirectPage()
    {
   // this.navCtrl.push(ValetPage);
    }


  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
}
