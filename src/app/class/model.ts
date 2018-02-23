// class
import { Schema } from './schema';

export class Model {

  public id: number;
  public name: string;
  public display_name: string;
  public use_soft_delete: boolean;
  public schemas: Schema[];
  public is_pivot: boolean;
  public pos_x: number;
  public pos_y: number;

  private _next_schema_id: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.display_name = '';
    this.use_soft_delete = false;
    this.schemas = [];
    this.is_pivot = false;
    this.pos_x = 0;
    this.pos_y = 0;
    this._next_schema_id = 1;
  }

  public getNewSchemaId(): number{
    this._next_schema_id ++;
    return this._next_schema_id-1;
  }

  public getElementId(): string{
    return "model" + this.id;
  }

  public getElementH2Id(): string{
    return "model" + this.id + "-h2";
  }

  public getSchemaById(schema_id:number): Schema{
    return this.schemas.filter( (v,i)=> v.id===schema_id )[0];
  }
}
