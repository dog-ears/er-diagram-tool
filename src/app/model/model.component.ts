// core
import { Component, Input } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';
import { JsPlumbService } from '../service/jsPlumb.service';

// component
import { ModalModelComponent } from '../modal-model/modal-model.component';
import { ModalSchemaComponent } from '../modal-schema/modal-schema.component';

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

  constructor( private bsModalService: BsModalService, private dataService: DataService, private jsPlumbService: JsPlumbService ) {}

  ngAfterViewInit(){
    console.log('ModelComponent('+ this.myModel.id +').ngAfterViewInit() is called!');
    this.jsPlumbService.initModel(this.myModel);
  }

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
    var schema = new Schema();
    schema.parent_id = this.myModel.id;
    this.bsModalRef = this.bsModalService.show( ModalSchemaComponent, {initialState:{
      mode: 'create',
      schema: schema
    }} );
  }

  private toggleDragable(){
    console.log('ModelComponent('+ this.myModel.id +').toggleDragable() is called!');
    this.jsPlumbService.toggleDraggable( this.myModel );
  }
}
