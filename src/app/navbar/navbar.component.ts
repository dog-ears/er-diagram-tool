// core
import { Component } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';

// component
import { ModalDataComponent } from '../modal-data/modal-data.component';
import { ModalModelComponent } from '../modal-model/modal-model.component';

// class
import { Model }  from '../class/model';

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
    this.bsModalRef = this.bsModalService.show( ModalModelComponent, {initialState:{
      mode: 'create',
      model: new Model()
    }} );
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
