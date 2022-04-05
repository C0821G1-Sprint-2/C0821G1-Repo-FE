import {Inject, Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id: '',
    url: ''
  };
  msg = 'error';
  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(id, url) {
    this.dataSet = {
      id,
      url
    };
    this.imageDetailList.push(this.dataSet);
  }
}
