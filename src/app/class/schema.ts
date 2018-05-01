export class Schema {

  public id: number;
  public name: string;
  public display_name: string;
  public type: string;
  public input_type: string;
  public varidate: string;
  public faker_type: string;
  public nullable: boolean;
  public unique: boolean;
  public show_in_list: boolean;
  public show_in_detail: boolean;
  public belongsto: string;
  public parent_id: number;

  constructor(schema_data=null) {
    if(schema_data){
      this.id = schema_data.id;
      this.name = schema_data.name;
      this.display_name = schema_data.display_name;
      this.type = schema_data.type;
      this.input_type = schema_data.input_type;
      this.varidate = schema_data.varidate;
      this.faker_type = schema_data.faker_type;
      this.nullable = schema_data.nullable;
      this.unique = schema_data.unique;
      this.show_in_list = schema_data.show_in_list;
      this.show_in_detail = schema_data.show_in_detail;
      this.belongsto = schema_data.belongsto;
      this.parent_id = schema_data.parent_id;
    }else{
      this.id = 0;
      this.name = '';
      this.display_name = '';
      this.type = 'string';
      this.input_type = 'text';
      this.varidate = '';
      this.faker_type = '';
      this.nullable = false;
      this.unique = false;
      this.show_in_list = true;
      this.show_in_detail = true;
      this.belongsto = '';
      this.parent_id = 0;
    }
  }
  
  public getElementId():string{
    return 'model' + this.parent_id + '-schema' + this.id;
  }
}