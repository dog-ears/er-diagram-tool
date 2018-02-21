// core
import { Injectable } from '@angular/core';

// service
import { DataService } from '../service/data.service';

declare var jsPlumb:any;

@Injectable()
export class JsPlumbService {

  constructor( private dataService: DataService ) {}

}