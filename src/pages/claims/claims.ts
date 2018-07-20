import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';

/**
 * Generated class for the ClaimsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
})
export class ClaimsPage {


 options: ThemeableBrowserOptions = {
  statusbar: {
      color: '#ffffffff'
  },
  toolbar: {
      height: 44,
      color: '#f0f0f0ff'
  },
  title: {
      color: '#003264ff',
      showPageTitle: true
  },
  closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
  },
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private themeableBrowser: ThemeableBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimsPage');
  }

  openOuterPage(browserUrl){
    
 //   this.iab.create(browserUrl, "_self", this.options);
 this.themeableBrowser.create(browserUrl, '_blank', this.options);
 //browser.show();
  }

}
