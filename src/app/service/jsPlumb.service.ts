// core
import { Injectable } from '@angular/core';

// service
import { DataService } from '../service/data.service';

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

}