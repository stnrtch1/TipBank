import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {JSONRoot, Day} from "./tips.model";

//make the service injectable for all components
@Injectable()
export class TipDataService{
    //all URLS for RESTful API
    //GET REQUEST
    private getScript:string = "http://localhost:8080/get";

    // the http service to be injected into the service
    private http:HttpClient;

    //array of the Day data
    public days:Day[];

    //used to determine if loading screen is on
    public loading:boolean = true;
    public status:string;

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

                //once the data is loaded, hide the loading screen
                this.loading = false;
            },
            err => {
                //data failed to load
                console.log("Error retreiving the tips!");
                console.log("Hey! Where's my money?");
            }
        )
    }

}
