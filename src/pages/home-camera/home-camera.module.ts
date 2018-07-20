import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeCameraPage } from './home-camera';

@NgModule({
  declarations: [
    HomeCameraPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeCameraPage),
  ],
})
export class HomeCameraPageModule {}
