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

    // add schema ( [source_model.name]_id ) to target_model
    var schema = new Schema();
    schema.id = target_model.getNewSchemaId();
    schema.name = source_model.name + "_id";
    schema.display_name =  source_model.name + " - NAME";
    schema.type = "integer";
    schema.input_type = "select";
    schema.varidate = "";
    schema.faker_type = "numberBetween(1,30)";
    schema.nullable = true;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = source_model.name;
    schema.belongsto_column = source_model_display_schema;
    schema.parent_id = target_model.id;

    target_model.schemas.push(schema);
  }
  
  public addManyToManyRelation( source_model:Model, target_model:Model, source_model_display_schema:string, target_model_display_schema:string ):void{
    console.log('DataService.addManyToManyRelation() is called!');

    let model_data = [{
      model: source_model,
      display_schema: source_model_display_schema
    },{
      model: target_model,
      display_schema: target_model_display_schema
    }];

    model_data.sort((a,b)=>{
      if(a.model.name < b.model.name){
        return -1;
      }else if(a.model.name > b.model.name){
        return 1;
      }else{
        return 0;
      }
    });
    
    // add pivot model
    var pivot_model = new Model();
    pivot_model.is_pivot = true;
    pivot_model.id = this.data.getNewModelId();
    pivot_model.name = model_data[0].model.name + '_' + model_data[1].model.name;
    pivot_model.display_name = '';
    pivot_model.use_soft_delete = true;
    pivot_model.schemas = [];

    // add two schema to pivot_model
    var schema = new Schema();
    schema.id = pivot_model.getNewSchemaId();
    schema.name = model_data[0].model.name + "_id";
    schema.display_name =  model_data[0].model.name + " - NAME";
    schema.type = "integer";
    schema.input_type = "select";
    schema.varidate = "";
    schema.faker_type = "numberBetween(1,30)";
    schema.nullable = true;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = model_data[0].model.name;
    schema.belongsto_column = model_data[0].display_schema;
    schema.parent_id = pivot_model.id;
    pivot_model.schemas.push(schema);

    var schema = new Schema();
    schema.id = pivot_model.getNewSchemaId();
    schema.name = model_data[1].model.name + "_id";
    schema.display_name =  model_data[1].model.name + " - NAME";
    schema.type = "integer";
    schema.input_type = "select";
    schema.varidate = "";
    schema.faker_type = "numberBetween(1,30)";
    schema.nullable = true;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = model_data[1].model.name;
    schema.belongsto_column = model_data[1].display_schema;
    schema.parent_id = pivot_model.id;
    pivot_model.schemas.push(schema);

    this.data.models.push(pivot_model);
  }

  public clearData(){
    console.log('DataService.clearData() is called!');
      this.data.clearData();
  }

  public loadData(data){
    console.log('DataService.loadData() is called!');
    this.clearData();    
    this.data.loadData(data);
  }
}