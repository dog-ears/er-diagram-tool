// core
import { Injectable } from '@angular/core';

// class
import { Data }  from '../class/data';
import { Model } from '../class/model';
import { Schema } from '../class/schema';

@Injectable()
export class DataService {

  public data:Data;
  public flg_repaint:boolean;

  constructor() {
    console.log('DataService.constructor() is called!');
    this.data = new Data();
    this.flg_repaint = false;
  }

  public addModel(model: Model):void{
    console.log('DataService.addModel() is called!');
    model.id = this.data.getNewModelId();
    this.data.models.push(model);
  }

  public deleteModel(id: number):void{
    console.log('DataService.deleteModel() is called!');
    this.data.models = this.data.models.filter((v,i)=>v.id!=id);
    this.flg_repaint = true;
  }

  public addSchema(schema:Schema):void{
    console.log('DataService.addSchema() is called!');
    var obj_model = this.data.getModelById(schema.parent_id);
    schema.id = obj_model.getNewSchemaId();
    obj_model.schemas.push(schema);
  }
  
  public deleteSchema(schema:Schema):void{
    console.log('DataService.deleteSchema() is called!');
    var obj_model = this.data.getModelById(schema.parent_id);
    obj_model.schemas = obj_model.schemas.filter((v,i)=>v.id!=schema.id);
    this.flg_repaint = true;
  }

  public moveSchema(schema:Schema, dir:number):void{
    console.log('DataService.moveSchema() is called!');
    var obj_model = this.data.getModelById(schema.parent_id);

    var len = obj_model.schemas.length;
    for(var i = 0; i<len; i++) {
      if( obj_model.schemas[i].id === schema.id ){

        var filterd_schemas = obj_model.schemas.filter( (v,i)=>v.id!==schema.id );
        filterd_schemas.splice(i+dir,0,obj_model.schemas[i]);
        obj_model.schemas = filterd_schemas;
        break;

      }
    }
    this.flg_repaint = true;
  }

  public addOneToManyRelation( source_model:Model, target_model:Model, source_model_display_schema:string, target_model_display_schema:string ):void{
    console.log('DataService.addOneToManyRelation() is called!');
  }
  
  public addManyToManyRelation( source_model:Model, target_model:Model, source_model_display_schema:string, target_model_display_schema:string ):void{
    console.log('DataService.addManyToManyRelation() is called!');
  }
  
}