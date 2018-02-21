// core
import { Component, Input } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// component
import { ModalModelComponent } from '../modal-model/modal-model.component';

// class
import { Model } from '../class/model';
import { Schema } from '../class/schema';

@Component({
  selector: 'model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {

  @Input() myModel: Model;

  private bsModalRef: BsModalRef;

  constructor( private bsModalService: BsModalService, private dataService: DataService ) {}

  private editModel():void{
    console.log('ModelComponent('+ this.myModel.id +').editModel() is called!');
    this.bsModalRef = this.bsModalService.show( ModalModelComponent, {initialState:{
      mode: 'edit',
      model: this.myModel
    }});
  }

  private deleteModel(){
    console.log('ModelComponent('+ this.myModel.id +').deleteModel() is called!');
    if( confirm('Want to delete ' + this.myModel.name +'?') ){
      this.dataService.deleteModel( this.myModel.id );
    }
  }

  private addSchema():void{
    console.log('ModelComponent('+ this.myModel.id +').addSchema() is called!');
  }
}
