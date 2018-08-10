
import { Injectable } from "@angular/core";
import { Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AppService{
    public url:String;

    constructor(private http: Http,){
        //this.url='http://situr.gov.co/api/webservices/';
        this.url='assets/json/';
    }

    getService(topic:string):Observable<any>{
        return this.http.get(this.url + topic)
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getPost(topic:string,obj:Object):Observable<any>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + topic,JSON.stringify(obj),options)
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getPut(topic:string,id:String,obj:Object)
    {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.url + topic +"/"+ id,JSON.stringify(obj),options)
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    getDelete(topic:string,id:String)
    {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + topic +"/"+ id)
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }
}