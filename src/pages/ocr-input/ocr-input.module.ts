import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcrInputPage } from './ocr-input';

@NgModule({
  declarations: [
    OcrInputPage,
  ],
  imports: [
    IonicPageModule.forChild(OcrInputPage),
  ],
})
export class OcrInputPageModule {}
