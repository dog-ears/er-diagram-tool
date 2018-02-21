// class
import { Model } from './model';

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
}