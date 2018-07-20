import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
* Generated class for the AddfamilyPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
selector: 'page-addfamily',
templateUrl: 'addfamily.html',
})
export class AddfamilyPage {

numberOfChildren: number = 0;
numOfChildrenArray = [];

constructor(public navCtrl: NavController, public navParams: NavParams) {
}



ionViewDidLoad() {
console.log('ionViewDidLoad AddfamilyPage');
}

generateFields(){
this.numOfChildrenArray = [];
for(let i = 0; i < this.numberOfChildren; i++){
this.numOfChildrenArray.push(i);
}
}
}