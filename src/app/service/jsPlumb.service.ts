// core
import { Injectable } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// component
import { ModalRelationComponent } from '../modal-relation/modal-relation.component';

// class
import { Model } from '../class/model';
import { Schema } from '../class/schema';

declare var jsPlumb:any;

@Injectable()
export class JsPlumbService {

  private _instance:any;
  private bsModalRef: BsModalRef;

  constructor( private dataService: DataService, private bsModalService: BsModalService ) {}

  public init():void{
    console.log('JsPlumbService.init() is called!');

    this._instance = jsPlumb.getInstance({
      Container:'canvas',
      Anchor : [ "RightMiddle", "LeftMiddle" ],
      ConnectionsDetachable: false,
    });
  }

  public initModel(model:Model): void{

    console.log('JsPlumbService.initModel() is called!');

    // draggable
    this._instance.draggable( model.getElementId() );
    this._instance.toggleDraggable( model.getElementId() );

    // add endpoint
    if(model.is_pivot === false){

      this._instance.addEndpoint( model.getElementH2Id(), {
        isSource: true,
        isTarget: true,
        beforeDrop: (params)=> {
          console.log('event[red - beforeDrop] is called!');
          this.bsModalRef = this.bsModalService.show( ModalRelationComponent,{initialState:{
            source_model: this.dataService.data.getModelByElementH2Id(params.sourceId),
            target_model: this.dataService.data.getModelByElementH2Id(params.targetId)
          }} );
          return false;
        },
      });
    }
  }
  
  public destroyModel(model:Model){

    //delete myself endpoint
    this._instance.selectEndpoints({
      source: model.getElementH2Id()
    }).delete();
  }
  
  public initSchema(schema:Schema){

    console.log('JsPlumbService.initSchema() is called!');

    if(schema.belongsto){

      var source_id = this.dataService.data.getModelByName(schema.belongsto).getElementH2Id();
      var target_id = schema.getElementId();
      var option = {
          source: source_id,
          target: target_id
      };
      if( this._instance.getConnections(option).length === 0 ){
        this._instance.connect(option);
        console.log('schema connected!(' + source_id + '--->' + target_id + ')');
      }
    }
    this.dataService.flg_repaint = true;
  }
  
  public destroySchema(schema:Schema){

    console.log('JsPlumbService.destroySchema() is called!');

    if(schema.belongsto){
      var option = {
          target: schema.getElementId()
      };
      var connections_to_delete = this._instance.getConnections(option);
      for( let i=0 ; i < connections_to_delete.length; i++){
        this._instance.deleteConnection(connections_to_delete[i]);
      }
    }
  }
  
  public toggleDraggable(model:Model): void{

    console.log('JsPlumbService.toggleDraggable() is called!');
    this._instance.toggleDraggable( model.getElementId() );
  }
  
  public repaintEverything(): void{

    console.log('JsPlumbService.repaintEverything() is called!');
    this._instance.repaintEverything(); 
  }
}