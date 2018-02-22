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
import { JsPlumbService } from './service/jsPlumb.service';

// component
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModelComponent } from './model/model.component';
import { SchemaComponent } from './schema/schema.component';
import { ModalDataComponent } from './modal-data/modal-data.component';
import { ModalModelComponent } from './modal-model/modal-model.component';
import { ModalSchemaComponent } from './modal-schema/modal-schema.component';
import { ModalRelationComponent } from './modal-relation/modal-relation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelComponent,
    SchemaComponent,
    ModalDataComponent,
    ModalModelComponent,
    ModalSchemaComponent,
    ModalRelationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    DataService,
    JsPlumbService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalDataComponent,
    ModalModelComponent,
    ModalSchemaComponent,
    ModalRelationComponent,
  ]
})
export class AppModule { }
