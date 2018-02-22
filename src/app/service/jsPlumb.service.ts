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
  
  public toggleDraggable(model:Model): void{

    console.log('JsPlumbService.toggleDraggable() is called!');
    this._instance.toggleDraggable( model.getElementId() );
  }
  
  public repaintEverything(): void{

    console.log('JsPlumbService.repaintEverything() is called!');
    this._instance.repaintEverything(); 
  }
}