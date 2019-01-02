import { Component } from '@angular/core';
import { TipDataService } from "./tipData.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ TipDataService ]
})
export class AppComponent{

  constructor(private data:TipDataService) {}
  
  //booleans to show/hide sections
  public showTotal:boolean = false;
  public showTipInterval:boolean = false;
  public showHourInterval:boolean = false;

  public ngOnInit():void{
    console.log("Initalizing!");
    this.data.load();
  }
}
