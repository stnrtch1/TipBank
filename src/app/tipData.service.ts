import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//make the service injectable for all components
@Injectable()
export class TipDataService{
    // the http service to be injected into the service
    private http:HttpClient;

    //the JSON file to read the data from
    private JSON = "./../Tip Amounts.json";

}
