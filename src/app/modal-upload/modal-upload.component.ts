// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';
import { JsPlumbService } from '../service/jsPlumb.service';

@Component({
  selector: 'modal',
  templateUrl: './modal-upload.component.html'
})

export class ModalUploadComponent {

  private _flg_file_selected: boolean;
  private _flg_file_loaded: boolean;
  private _data;

  constructor( private bsModalRef: BsModalRef, private dataService: DataService, private jsPlumbService: JsPlumbService ) {
    this._flg_file_selected = false;
    this._flg_file_loaded = false;
  }
  
  private onFileSelected(event){
    console.log('ModalUploadComponent.onFileSelected() is called!');

    if(event.target.files.length <= 0){
      this._flg_file_selected = false;
      this._flg_file_loaded = false;
      return false;
    }

    this._flg_file_selected = true;
    
    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.addEventListener('load',()=>{
      console.log( JSON.parse(reader.result) );
      this._flg_file_loaded = true;
      this._data = JSON.parse(reader.result);
    });

  }
  
  private uploadJson(){
    console.log('ModalUploadComponent.uploadJson() is called!');
    this.jsPlumbService.deleteAll();
    this.dataService.loadData(this._data);
    this.bsModalRef.hide();
  }
}