// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// class
import { Model }  from '../class/model';
import { Schema }  from '../class/schema';

@Component({
  selector: 'modal',
  templateUrl: './modal-relation.component.html'
})

export class ModalRelationComponent {

  public source_model: Model;
  public target_model: Model;

  public relation_type:string;
  public source_model_display_schema: string;
  public target_model_display_schema: string;

  constructor( private bsModalRef: BsModalRef, private dataService: DataService ) {
    console.log('ModalRelationComponent.constructor() is called!');
    this.relation_type = 'one-to-many';
    this.source_model_display_schema = '';
    this.target_model_display_schema = '';
  }

  private create(){
    console.log('ModalRelationComponent.create() is called!');
    if(this.relation_type == 'one-to-many'){
      this.dataService.addOneToManyRelation(this.source_model, this.target_model, this.source_model_display_schema, this.target_model_display_schema);
    }else if(this.relation_type == 'many-to-many'){
      this.dataService.addManyToManyRelation(this.source_model, this.target_model, this.source_model_display_schema, this.target_model_display_schema);
    }
    this.bsModalRef.hide();
  }
}