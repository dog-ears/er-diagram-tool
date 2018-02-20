export class Schema {

  public id: number;
  public name: string;
  public display_name: string;
  public type: string;
  public input_type: string;
  public varidate: string;
  public faker_type: string;
  public nullable: boolean;
  public show_in_list: boolean;
  public show_in_detail: boolean;
  public belongsto: string;
  public belongsto_column: string;
  public parent_id: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.display_name = '';
    this.type = '';
    this.input_type = '';
    this.varidate = '';
    this.faker_type = '';
    this.nullable = false;
    this.show_in_list = true;
    this.show_in_detail = true;
    this.belongsto = '';
    this.belongsto_column = '';
    this.parent_id = 0;
  }
}