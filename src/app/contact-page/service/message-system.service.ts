import { Injectable } from '@angular/core';

import { Http}          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Message } from '../class/message';

@Injectable()
export class MessageService {
	
	 private projectUrl = "assets/php/contact_me.php";
	
  	constructor(private http: Http) { }
    
    sendMessage( message: Message) : Observable<Message> | any {
        return this.http.post(this.projectUrl, message)
                .map(response => {
                  console.log(message);
                  console.log(response);
                  return response;
                 })
                .catch(error => {
                    return Observable.throw(error)
                })

    }


}
