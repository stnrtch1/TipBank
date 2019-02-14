import { Component } from '@angular/core';
import { TipDataService } from "./tipData.service";
import { Day } from "./tips.model";

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

  public ngOnInit():void{
    console.log("Initalizing!");
    this.tipData.load();
  }

  //------------------------------------------------------------------event handlers
  //THESE FUNCTIONS ARE IN HERE TO CLOSE THE PANELS ONCE SOMETHING IS DONE

  public sendDay(date:string,money:number,hours:number){
    //turn on loading screen
    this.tipData.loading = true;
    this.tipData.status = "Adding The Day...";
    //close the form and send the day
    this.showNewDay = false;
    this.tipData.sendDay(date,money,hours);
  }

  public editDay(sent:Day){
    //turn on loading screen
    this.tipData.loading = true;
    this.tipData.status = "Editing The Day...";
    //close the form and edit the day
    this.showEdit = false;
    this.tipData.editDay(sent);
  }

  public deleteDay(id:string){
    //turn on loading screen
    this.tipData.loading = true;
    this.tipData.status = "Deleting The Day...";
    //close the form and delete the day
    this.showDelete = false;
    this.tipData.deleteDay(id);

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
