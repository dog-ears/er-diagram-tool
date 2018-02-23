// class
import { Model } from './model';
import { Schema } from './schema';

export class Data {

  public app_type: string;
  public use_laravel_auth: boolean;
  public models: Model[];

  private _next_model_id: number;

  constructor() {
      this.app_type = 'web';
      this.use_laravel_auth = false;
      this.models = [];
      this._next_model_id = 1;
  }

  public getNewModelId(): number{
    this._next_model_id ++;
    return this._next_model_id-1;
  }
  
  public getModelById(model_id:number): Model{
    return this.models.filter( (v,i) => v.id===model_id )[0];
  }

  public getModelByElementH2Id(model_element_h2_id:string): Model{
    return this.models.filter( (v,i) => v.getElementH2Id()===model_element_h2_id )[0];
  }

  public getModelByName(model_name:string): Model{
    return this.models.filter( (v,i) => v.name===model_name )[0];
  }

  public getSchemaByElementId( schema_element_id:string ):Schema{
    console.log('Data.getSchemaByElementId() is called!');
    var ids = schema_element_id.replace('model','').split('-schema');
    return this.getModelById( Number(ids[0]) ).getSchemaById( Number(ids[1]) );
  }
}