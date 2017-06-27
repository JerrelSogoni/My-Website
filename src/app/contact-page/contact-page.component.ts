import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Http} from "@angular/http";

import { Message} from './class/message';
import { MessageService } from './service/message-system.service';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  providers: [ MessageService ],
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
 contactForm: FormGroup;
 captcha: boolean = false;
 message: Message;
 success: String;
 http : Http;

  constructor(private messageService: MessageService) {

  
  }

  ngOnInit() {


  		this.contactForm = new FormGroup({
    	name: new FormControl('', [Validators.required]),
    	email: new FormControl('', [Validators.required]),
    	phone: new FormControl(''),
    	subject: new FormControl('', [Validators.required]),
    	message: new FormControl('', [Validators.required, Validators.maxLength(140)])

    	});


  }
   public onSubmit() {
   if (this.captcha){
   	let message = new Message();
   	message.name = this.contactForm.get('name').value;
   	message.email = this.contactForm.get('email').value;
   	message.phone = this.contactForm.get('phone').value;
   	message.subject = this.contactForm.get('subject').value;
   	message.message = this.contactForm.get('message').value;
   	this.sendMessage(message);
   	
   }

   this.captcha = false;
    
  }
  public resolved(captchaResponse: string) {
    this.captcha = true;
  }
  public sendMessage(message: Message) {
    this.messageService.sendMessage(message).subscribe(res => {
      this.success = "YES";
      this.contactForm.reset();
    }, error => {
      this.success = "NO";
    })
  }

}
