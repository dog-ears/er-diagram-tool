// core
import { Injectable } from '@angular/core';

// service
import { DataService } from '../service/data.service';

// class
import { Model } from '../class/model';

declare var jsPlumb:any;

@Injectable()
export class JsPlumbService {

  private _instance:any;

  constructor( private dataService: DataService ) {}

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
  }
  
  public toggleDraggable(model:Model): void{

    console.log('JsPlumbService.toggleDraggable() is called!');
    this._instance.toggleDraggable( model.getElementId() );
  }
}