// core
import { Component, Input } from '@angular/core';

// ngx-bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// service
import { DataService } from '../service/data.service';
import { JsPlumbService } from '../service/jsPlumb.service';

// component
import { ModalSchemaComponent } from '../modal-schema/modal-schema.component';

// class
import { Schema } from '../class/schema';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent {

  @Input() mySchema: Schema;
  @Input() first;
  @Input() last;
  @Input() is_pivot;

  private bsModalRef: BsModalRef;

  constructor( private bsModalService: BsModalService, private dataService: DataService, private jsPlumbService: JsPlumbService ) {}

  ngAfterViewInit(){
    console.log( 'SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id + ').ngAfterViewInit() is called!' );
    this.jsPlumbService.initSchema(this.mySchema);
  }

	ngOnDestroy(){
    console.log( 'SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id + ').ngOnDestroy() is called!' );
    this.jsPlumbService.destroySchema(this.mySchema);
	}

  private editSchema():void{
    console.log('SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id +').editSchema() is called!');
    this.bsModalRef = this.bsModalService.show( ModalSchemaComponent, {initialState:{
      mode:'edit',
      schema: this.mySchema,
      use_laravel_auth: this.dataService.data.use_laravel_auth,
      parent_model: this.dataService.data.getModelById(this.mySchema.parent_id)
    }} );
  }

  private deleteSchema(){
    console.log('SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id +').deleteSchema() is called!');
    this.dataService.deleteSchema( this.mySchema );
  }

  private moveupSchema(){
    if(!this.first){
      console.log('SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id +').moveupSchema() is called!');
      this.dataService.moveSchema( this.mySchema, -1 );
    }
  }

  private movedownSchema(){
    if(!this.last){
      console.log('SchemaComponent(' + this.mySchema.parent_id + ' / ' + this.mySchema.id +').movedownSchema() is called!');
      this.dataService.moveSchema( this.mySchema, 1 );
    }
  }
}
