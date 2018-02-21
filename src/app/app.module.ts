// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

// service
import { DataService } from './service/data.service';

// component
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModelComponent } from './model/model.component';
import { ModalDataComponent } from './modal-data/modal-data.component';
import { ModalModelComponent } from './modal-model/modal-model.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelComponent,
    ModalDataComponent,
    ModalModelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalDataComponent,
    ModalModelComponent,
  ]
})
export class AppModule { }
