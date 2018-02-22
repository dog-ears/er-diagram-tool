import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// class
import { Schema }  from '../class/schema';

@Component({
  selector: 'modal',
  templateUrl: './modal-schema.component.html'
})

export class ModalSchemaComponent {

  public mode: string; // create or edit
  public schema: Schema;
  
  constructor( private bsModalRef: BsModalRef, private dataService: DataService ) {}

  ngOnDestroy() {
    console.log('ModalSchemaComponent.ngOnDestroy() is called!');
    this.dataService.flg_repaint = true;
  }

  private create(){
    console.log('ModalSchemaComponent.create() is called!');
    this.dataService.addSchema(this.schema);
    this.bsModalRef.hide();
  }
}