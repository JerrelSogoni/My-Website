import { Injectable } from '@angular/core';

import { Http, Response , URLSearchParams}          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Message } from '../class/message';

@Injectable()
export class MessageService {
	
	private projectUrl = 'assets/php/server.php';
	
  	constructor(private http: Http) { }


}
