import {Component} from '@angular/core';
//import { NavController } from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
import {FileOpener} from '@ionic-native/file-opener';
import {FilePath} from '@ionic-native/file-path';


@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html'
})
export class PdfPage {
  constructor(private fileOpener: FileOpener, private fileChooser: FileChooser, private filePath: FilePath) {

  }

  chooseFile() {
    this.fileChooser.open().then(file => {
      this.filePath.resolveNativePath(file).then(resolvedFilePath => {
        this.fileOpener.open(resolvedFilePath, 'appication/pdf').then(value => {

          console.log(value);
        }).catch(err => {
          alert(JSON.stringify(err));
        });
      }).catch(err => {
        alert(JSON.stringify(err));
      });
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

}

