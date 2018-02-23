// core
import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'modal',
  templateUrl: './modal-download.component.html'
})

export class ModalDownloadComponent {

  public uri: SafeUrl; // create or edit
  
  constructor( private bsModalRef: BsModalRef ) {}
}