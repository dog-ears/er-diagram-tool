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
    
    // confirm changing schema id for relation or not change
    var f_schema_id_for_relation = false;
    if(obj_model.schema_id_for_relation === 0 && obj_model.is_pivot===false){
      if( confirm("This model's Schema id for relation is default(0:id).\nWant to set new schema? ") ){
        f_schema_id_for_relation = true;
      }
    }

    schema.id = obj_model.getNewSchemaId();
    
    if(f_schema_id_for_relation){
      obj_model.schema_id_for_relation = schema.id;
    }
    
    obj_model.schemas.push(schema);
  }
  
  public deleteSchema(schema:Schema):void{
    console.log('DataService.deleteSchema() is called!');

    var obj_model = this.data.getModelById(schema.parent_id);

    // confirm
    var confirm_txt = '';
    if(obj_model.schema_id_for_relation === schema.id){
      confirm_txt = 'Want to delete ' + schema.name +'?' + "\n" + "(And this Model's Relation schema is change to default(id) )";
    }else{
      confirm_txt = 'Want to delete ' + schema.name +'?';
    }
    if( !confirm( confirm_txt ) ){
      return;
    }    

    if(obj_model.schema_id_for_relation === schema.id){
      obj_model.schema_id_for_relation = 0;
    }

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

  public addOneToManyRelation( source_model:Model, target_model:Model ):void{
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
    schema.unique = false;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = source_model.name;
    schema.parent_id = target_model.id;

    target_model.schemas.push(schema);
  }
  
  public addManyToManyRelation( source_model:Model, target_model:Model ):void{
    console.log('DataService.addManyToManyRelation() is called!');

    let model_data = [{
      model: source_model,
    },{
      model: target_model,
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
    pivot_model.display_name = 'PIVOT';
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
    schema.unique = false;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = model_data[0].model.name;
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
    schema.unique = false;
    schema.show_in_list = true;
    schema.show_in_detail = true;
    schema.belongsto = model_data[1].model.name;
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
  
  public addLaravelUserModel():void{
    console.log('DataService.addLaravelUserModel() is called!');
    var model = new Model();
    model.id = this.data.getNewModelId();
    model.name = 'user';
    model.display_name = 'USER';
    model.use_soft_delete = false;
    model.schema_id_for_relation = 1;
    this.data.models.push(model);
    this.editSchemaToLaravelUserModel();
  }
  
  public editSchemaToLaravelUserModel():void{
    console.log('DataService.addSchemaToLaravelUserModel() is called!');

    var model_user = this.data.getModelByName('user');
    
    // other column turn nullable to true
    model_user.schemas.forEach((v)=>{
      v.nullable = true;
    });

    if( model_user.getSchemaByName('name')===null ){
      var schema = new Schema();
      schema.name = 'name';
      schema.parent_id = model_user.id;
      this.addSchema(schema);
    }
    if( model_user.getSchemaByName('email')===null ){
      var schema = new Schema();
      schema.name = 'email';
      schema.parent_id = model_user.id;
      this.addSchema(schema);
    }
    if( model_user.getSchemaByName('password')===null ){
      var schema = new Schema();
      schema.name = 'password';
      schema.parent_id = model_user.id;
      this.addSchema(schema);
    }

    var model_user_schema_name = model_user.getSchemaByName('name');
    var model_user_schema_email = model_user.getSchemaByName('email');
    var model_user_schema_password = model_user.getSchemaByName('password');
    
    // set model's schema_id_for_relation to 'name'
    model_user.schema_id_for_relation = model_user_schema_name.id;

    // name
    model_user_schema_name.display_name = 'NAME';
    model_user_schema_name.type = 'string';
    model_user_schema_name.input_type = 'text';
    model_user_schema_name.nullable = false;
    model_user_schema_name.unique = false;

    // email
    model_user_schema_email.display_name = 'EMAIL';
    model_user_schema_email.type = 'string';
    model_user_schema_email.input_type = 'text';
    model_user_schema_email.nullable = false;
    model_user_schema_email.unique = true;

    // password
    model_user_schema_password.display_name = 'PASSWORD';
    model_user_schema_password.type = 'string';
    model_user_schema_password.input_type = 'text';
    model_user_schema_password.nullable = false;
    model_user_schema_password.unique = false;
    model_user_schema_password.show_in_list = false;
    model_user_schema_password.show_in_detail = false;
  }
}