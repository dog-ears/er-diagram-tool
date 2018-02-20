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
}