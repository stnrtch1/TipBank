import { Component } from '@angular/core';
import { TipDataService } from "./tipData.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ TipDataService ]
})
export class AppComponent{

  constructor(private tipData:TipDataService) {}
  
  //booleans to show/hide sections
  public showTotal:boolean = false;
  public showTipInterval:boolean = false;
  public showHourInterval:boolean = false;
  public showNewDay:boolean = false;
  public showDelete:boolean = false;

  public ngOnInit():void{
    console.log("Initalizing!");
    this.tipData.load();
  }

  //------------------------------------------------------------------toggle functions
  public toggleTotal():void{
    this.showTotal = !this.showTotal;
    console.log(this.showTotal);
  }

  public toggleTips():void{
    this.showTipInterval = !this.showTipInterval;
    console.log(this.showTipInterval);
  }

  public toggleHours():void{
    this.showHourInterval = !this.showHourInterval;
    console.log(this.showHourInterval);
  }

  public toggleNewDay():void{
    this.showNewDay = !this.showNewDay;
  }

  public toggleDelete():void{
    this.showDelete = !this.showDelete;
  }

}
