import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Chart } from 'chart.js';
/**
 * Generated class for the CoveragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coverage',
  templateUrl: 'coverage.html',
})

export class CoveragePage {
  @ViewChild('slides') slides: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
 
  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;
  doughnutChart: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
  }

  ionViewDidLoad() {
 
    this.slides.lockSwipes(true);
   
    this.dataService.load().then((data) => {

        data.map((question) => {

            let originalOrder = question.answers;
            question.answers = this.randomizeAnswers(originalOrder);
            return question;

        });    

        this.questions = data;

    });
	
}
onSubmit(){
	//var data = JSON.parse(arr);
	//alert(data);
	this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
               labels: ["Health", "Travel", "Motor", "Life"],
                datasets: [{
                    label: '# of Votes',
                    data: [15, 25, 20, 35],
                    backgroundColor: [
                        "#36A2EB",
                        "#02def2",
                        "#06c971",
						"#9802ef"
                    ],
                    
                }]
            }
 
        });
}
nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
}

selectAnswer(answer, question){

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;
	 var arr = answer;
	for(let i=0 ; i<arr.length;i++){
		arr.push(answer);
	}	 
	//console.log(arr);
    this.onSubmit();

    setTimeout(() => {
        this.hasAnswered = false;
        this.nextSlide();
        answer.selected = false;
        question.flashCardFlipped = false;
    }, 100);
}

randomizeAnswers(rawAnswers: any[]): any[] {
    for (let i = rawAnswers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = rawAnswers[i];
        rawAnswers[i] = rawAnswers[j];
        rawAnswers[j] = temp;
    }
 
    return rawAnswers;

}


restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
}

}


