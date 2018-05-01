// core
import { Component, Input, ElementRef } from '@angular/core';

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

  constructor( private bsModalService: BsModalService, private dataService: DataService, private jsPlumbService: JsPlumbService, private el: ElementRef ) {}

  ngAfterViewInit(){
    console.log('ModelComponent('+ this.myModel.id +').ngAfterViewInit() is called!');
    this.jsPlumbService.initModel(this.myModel);
  }

	ngOnDestroy(){
    console.log('ModelComponent('+ this.myModel.id +').ngOnDestroy() is called!');
    this.jsPlumbService.destroyModel(this.myModel);
	}

  private editModel():void{
    console.log('ModelComponent('+ this.myModel.id +').editModel() is called!');
    this.bsModalRef = this.bsModalService.show( ModalModelComponent, {initialState:{
      mode: 'edit',
      model: this.myModel,
      use_laravel_auth: this.dataService.data.use_laravel_auth
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
    if(this.dataService.data.use_laravel_auth){
      schema.nullable = true;
    }
    this.bsModalRef = this.bsModalService.show( ModalSchemaComponent, {initialState:{
      mode: 'create',
      schema: schema,
      use_laravel_auth: this.dataService.data.use_laravel_auth,
      parent_model: this.myModel
    }} );
  }

  private startDrag():void{
    console.log('ModelComponent('+ this.myModel.id +').startDrag() is called!');
    this.jsPlumbService.toggleDraggable( this.myModel );
  }

  private endDrag():void{
    console.log('ModelComponent('+ this.myModel.id +').endDrag() is called!');
    this.jsPlumbService.toggleDraggable( this.myModel );
    
    // record position
    let style_left = this.el.nativeElement.querySelectorAll( '#' + this.myModel.getElementId() )[0].style.left;
    let style_top = this.el.nativeElement.querySelectorAll( '#' + this.myModel.getElementId() )[0].style.top;
    this.myModel.pos_x = parseInt(style_left, 10);
    this.myModel.pos_y = parseInt(style_top, 10);
  }
}
