// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// class
import { Model }  from '../class/model';

@Component({
  selector: 'modal',
  templateUrl: './modal-model.component.html'
})

export class ModalModelComponent {

  public mode: string; // create or edit
  public model: Model;
  
  constructor( private bsModalRef: BsModalRef, private dataService: DataService ) {}

  private create(){
    console.log('ModalTableComponent.create() is called!');
    this.dataService.addModel(this.model);
    this.bsModalRef.hide();
  }
}