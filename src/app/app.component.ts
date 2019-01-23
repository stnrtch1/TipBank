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
  public showEdit:boolean = false;

  //values needed for editing days
  public dayMoney:string;
  public dayHours:string;

  public ngOnInit():void{
    console.log("Initalizing!");
    this.tipData.load();

    //populate values for editing days
    this.dayMoney = this.tipData.selected.money;
    this.dayHours = this.tipData.selected.hours;
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

  public toggleEdit():void{
    this.showEdit = !this.showEdit;
  }


}
