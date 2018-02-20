// core
import { Component } from '@angular/core';

// service
import { DataService } from './service/data.service';

// class
import { Data }  from './class/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data:Data;

  constructor( private dataService: DataService ) {
    console.log('AppComponent.constructor() is called!');
    this.data = this.dataService.data;
  }

}
