// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// component
import { ModalDataComponent } from '../modal-data/modal-data.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  private isCollapsed: boolean = true;
  private bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService, private dataService: DataService) {}

  private createModel():void{
    console.log('NavbarComponent.createNewTable() is called!');
  }

  private exportJson():void{
    console.log('NavbarComponent.exportJson() is called!');
  }

  private dataSetting():void{
    console.log('NavbarComponent.dataSetting() is called!');

    this.bsModalRef = this.bsModalService.show( ModalDataComponent, {initialState:{
      data: this.dataService.data
    }} );
  }

}
