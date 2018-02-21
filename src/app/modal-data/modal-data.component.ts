// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// class
import { Data }  from '../class/data';

@Component({
  selector: 'modal',
  templateUrl: './modal-data.component.html'
})

export class ModalDataComponent {

  public data: Data;

  constructor( private bsModalRef: BsModalRef ) {}
}