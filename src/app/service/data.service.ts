// core
import { Injectable } from '@angular/core';

// class
import { Data }  from '../class/data';
import { Model } from '../class/model';
import { Schema } from '../class/schema';

@Injectable()
export class DataService {

  public data:Data;

  constructor() {
    console.log('DataService.constructor() is called!');
    this.data = new Data();
  }

  public addModel(model: Model):void{
    console.log('DataService.addModel() is called!');
    model.id = this.data.getNewModelId();
    this.data.models.push(model);
  }

  public deleteModel(id: number):void{
    console.log('DataService.deleteModel() is called!');
    this.data.models = this.data.models.filter((v,i)=>v.id!=id);
  }
}