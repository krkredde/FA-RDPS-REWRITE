import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
// import { CoveragePage } from '../coverage/coverage';
import { AddfamilyPage } from '../addfamily/addfamily';
import { ClaimsPage } from '../claims/claims';
import { ContactOfSomeOneTrustedPage } from '../contact-of-some-one-trusted/contact-of-some-one-trusted';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  
})
export class DashboardPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvasTwo') doughnutCanvasTwo;
  doughnutChart: any;

  isOptionsOpened = false;

  policyData = [];

  policyObj = {
    policy: 'https://policyValue',
    coverage: 'coverageValue',
    riders: 'ridersValue',
    beneficiary: 'beneficiaryValue',
    expDate: 'expDateValue'
  };
  
  listOfInsurances = [
    {
    "name": "Health",
    "children": ["Policy No", "Coverage", "Riders", "Beneficiary", "Cliams", "Expires On"],
    "open": false,
    "img": "assets/img/plus.png",
    "bgColor": "#129bec",
    "itemsCount": 4,
    "value": "RM 1,55,000",
    "days": "50 years 235 days"
    },
    {
      "name": "Travel",
      "children": ["Policy No", "Coverage", "Riders", "Beneficiary", "Cliams", "Expires On"],
      "open": false,
      "img": "assets/img/airp.png",
      "bgColor": "#0cc6ec",
      "itemsCount": 2,
      "value": "RM 50,000",
      "days": "47 days"
      },
    {
      "name": "Life",
      "children": ["Policy No", "Coverage", "Riders", "Beneficiary", "Cliams", "Expires On"],
      "open": false,
      "img": "assets/img/flower.png",
      "bgColor": "#25e7cd",
      "itemsCount": 2,
      "value": "RM 3,40,000",
      "days": "2 years"
      }
  ]
  bgColors= [
    '#3f51b5',
    '#039BE5',
    '#06d9f3',
    '#e0e0e0',
    '#e0e0e0',
    '#f68a06'
];

hoverBgColors = [
  '#3f51b5',
  '#039BE5',
  '#06d9f3',
  '#e0e0e0',
  '#e0e0e0',
  '#f68a06'
];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addPolicy() {
    this.policyData.push(this.policyObj);
  }

  toggleSection(i) {
    this.listOfInsurances[i].open = !this.listOfInsurances[i].open;
  }

  showHideOptions(){
    this.isOptionsOpened = !this.isOptionsOpened;
  }
addPolices(){
//alert("ok");
this.policyData.push(this.policyObj);
}
  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          // labels: ["Life", "Travel", "Medical", "Car"],
          datasets: [{
              label: 'Type of insurance',
              data: [5, 5, 5, 5, 5, 5],
              backgroundColor: this.bgColors,
              hoverBackgroundColor: this.hoverBgColors
          }]
      }

  });
  this.doughnutChart = new Chart(this.doughnutCanvasTwo.nativeElement, {
 
    type: 'doughnut',
    data: {
        // labels: ["Life", "Travel", "Medical", "Car"],
        datasets: [{
            label: 'Type of insurance',
            data: [5, 5, 5, 5, 5, 5],
            backgroundColor: this.bgColors,
              hoverBackgroundColor: this.hoverBgColors
        }]
    }

});
  }
    // coverage()
    // {
    // this.navCtrl.push(CoveragePage);
    // }
    addfamily()
{
this.navCtrl.push(AddfamilyPage);
}
logout()
{
  this.navCtrl.push(AddfamilyPage);
}
claims()
{
 this.navCtrl.push(ClaimsPage);
}

contactofsomeonetrusted()
{
 this.navCtrl.push(ContactOfSomeOneTrustedPage);
}

}
