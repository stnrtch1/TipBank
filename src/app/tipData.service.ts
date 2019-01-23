import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {JSONRoot, Day} from "./tips.model";

//make the service injectable for all components
@Injectable()
export class TipDataService{
    //all URLS for RESTful API
    //GET REQUEST
    private getScript:string = "http://localhost:8080/get";
    //POST REQUEST
    private postScript:string = "http://localhost:8080/post";

    // the http service to be injected into the service
    private http:HttpClient;

    //array of the Day data
    public days:Day[];

    //the selected day
    public selected:Day;

    //used to determine if loading screen is on
    public loading:boolean = true;
    public status:string;

    //used for the grand total variables
    public totalTips:number;
    public totalHours:number;

    //used for the tipSection variables
    public underOne:number;
    public lowerOne:number;
    public highOne:number;
    public aboveTwo:number;

    //used for the hourSection variables
    public noBreak:number;
    public oneBreak:number;
    public oneLongBreak:number;
    public twoBreak:number;
    public twoLongBreak:number;

    //inject Http service into DataService
    constructor(myHttp:HttpClient){
        this.http = myHttp;
    }

    //load the data from the server to the client
    public load():void{
        console.log("Loading Data");
        this.status = "Loading Data...";

        this.http.get<JSONRoot>(this.getScript).subscribe(
            data => {
                //the app has the data
                console.log(JSON.stringify(data));

                //set the days property from the data
                this.days = data.days

                //set the selected day to the first day by default
                this.selected = this.days[0];
                console.log(this.days.length);
                //once the data is loaded, hide the loading screen
                this.loading = false;

                this.getStatistics();
            },
            err => {
                //data failed to load
                console.log("Error retreiving the tips!");
                console.log("Hey! Where's my money?");
            }
        )
    }

    //the stats for the various buttons
    public getStatistics():void{
        let tips:number = 0;
        let hours:number = 0;
        //-----------------------------------------
        //underOne is any amount below $1
        let uO:number = 0;
        //lowerOne is any amount between $1 and $1.49
        let lO:number = 0;
        //highOne is any amount between $1.50 and $1.99
        let hO:number = 0;
        //aboveTwo is any amount above $2
        let aT:number = 0;
        //-----------------------------------------
        //noBreak is any hours below 4.5
        let nB:number = 0;
        //oneBreak is any amount above 4.5 and below 6
        let oB:number = 0;
        //oneLongBreak is any amount above 6 and below 8
        let oLB:number = 0;
        //twoBreak is any amount above 8 and below 10
        let tB:number = 0;
        //twoLongBreak is any amount above 10 hours
        let tLB:number = 0;

        for (let i=0; i<this.days.length;i++){
            //used to determine grand total values
            tips += parseInt(this.days[i].money);
            hours += parseInt(this.days[i].hours);

            //used for tips section values
            let tpa:number = (parseInt(this.days[i].money)/parseInt(this.days[i].hours))
            if (tpa < 1.00){
                uO++;
            } else if (tpa >= 1.00 && tpa <= 1.49){
                lO++;
            } else if (tpa >= 1.50 && tpa <= 1.99){
                hO++;
            } else if (tpa >= 2.00){
                aT++;
            }

            //used for hour section values
            let hour:number = parseInt(this.days[i].hours);
            if (hour < 4.5){
                nB++;
            } else if (hour >= 4.5 && hour < 6){
                oB++;
            } else if (hour >= 6 && hour < 8){
                oLB++;
            } else if (hour >= 8 && hour < 10){
                tB++;
            } else if (hour >= 10){
                tLB++;
            }
        }

        //set all variables made
        //GRAND TOTAL
        this.totalTips = tips;
        this.totalHours = hours;
        //TIP SECTIONS
        this.underOne = uO;
        this.lowerOne = lO;
        this.highOne = hO;
        this.aboveTwo = aT;
        //HOUR SECTIONS
        this.noBreak = nB;
        this.oneBreak = oB;
        this.oneLongBreak = oLB;
        this.twoBreak = tB;
        this.twoLongBreak = tLB;
    }

    public sendDay(date:string,tips:number,hours:number):void{
        //separate the date string for conversion
        let year = date.substr(0,4);
        let month = date.substr(5,2);
        let day = date.substr(8,2);

        let myDate = this.convertDate(year,month,day);


        let sendJSON = {
            "date": myDate,
            "money": tips,
            "hours": hours
        }

        this.http.post<string>(this.postScript,sendJSON).subscribe(
            res => {
                //once everything is done, reload the data
                this.load();
            }
        )
        
    }

    //-----------------------------------------------------------------private methods
    private convertDate(year:string,month:string,day:string):string{
        //convert month into an number
        let myMonth = parseInt(month);

        //check if a day has a 0 in front of it and remove it if it does
        if(day.indexOf("0") == 0){
            day = day.substr(1,1);
        }

        //array of month values
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        //set up the day prefix
        if(day == "1" || day == "21" || day == "31"){
            day = day + "st";
        } else if (day == "2" || day == "22"){
            day = day + "nd";
        } else if (day == "3" || day == "23"){
            day = day + "rd";
        } else{
            day = day + "th";
        }

        return months[myMonth-1] + " " + day + ", " + year;
    }
}
