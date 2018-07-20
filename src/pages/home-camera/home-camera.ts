import { Component } from '@angular/core';
import { NavController , AlertController, NavParams, ActionSheetController, LoadingController  } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { OcrInputPage } from '../ocr-input/ocr-input';


@Component({
  selector: 'page-home-camera',
  templateUrl: 'home-camera.html'
})
export class HomeCameraPage {
  public photos : any;
  public base64Image : string;
  OCRAD :any;
  srcImage: string;
  cropInstance: string;
  Croppr: string;
  imgCroppedUrl: string;
  imgUrl: string;
  
  
  
  
  constructor(public navCtrl : NavController, private camera : Camera, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController, private alertCtrl : AlertController) {

}
//allow them to choose from multiple photo options, 0 = library  1 = camera take pic
presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    buttons: [
      {
        text: 'Choose Photo',
        handler: () => {
          this.getPicture(0); //0 == library 
        }
      },{
        text: 'Take Photo',
        handler: () => {
          this.getPicture(1); // 1 == Camera
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}

  ngOnInit() {
    this.photos = [];
  }

  
  getPicture(sourceType: number) {
    const options : CameraOptions = {
      quality: 75, // picture quality
      sourceType,
     targetWidth: 500,
     targetHeight: 500,
     correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
      
  }
 deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }
  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Please wait...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
    });
  }

  restart() {
    this.srcImage= '';
    this.presentActionSheet();
  }
  
 //Bindu

 ionViewDidLoad() { 
  this.croppr();
}
croppr(){
  
    // this.cropInstance = new Croppr('#croppr', {
        // options
      //});  
  }
  cropprGetVal(){
   // var newSrc
    var data:any = []
    //data = this.cropInstance.getValue();
    let x = data.x
    let y = data.y
    let width = data.width
    let height = data.height
   
    var img = new Image();
    img.src = this.imgUrl;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width=width
    canvas.height=height
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height); 
    console.log(canvas.toDataURL("image/jpeg"))
    this.imgCroppedUrl = canvas.toDataURL("image/jpeg")
  }
  
   onOCRPage()
    {
    this.navCtrl.push(OcrInputPage);
    }
	

  
}



