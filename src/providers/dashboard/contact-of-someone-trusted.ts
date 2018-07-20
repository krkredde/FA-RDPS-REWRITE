import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ContactOfSomeoneTrusted {
 
    data: any;

    baseUrl = 'http://192.168.0.199:8080/smartgenie/saveEmergencyDtls';
 
    constructor(public http: Http) {
 
    }
 
    submitTrustedContacts(reqObj: any){
 
        let url = this.baseUrl;

        if(this.data){
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
 
            this.http.post(url, reqObj).map(res => res.json()).subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
 
        });
 
    }
 
}