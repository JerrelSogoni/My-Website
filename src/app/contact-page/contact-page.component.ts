import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Http} from "@angular/http";




@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

 contactForm: FormGroup;
 captcha: boolean = false;
 http : Http;

  constructor() {

  
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
   onSubmit() {
   if (this.captcha){

   	this.contactForm.reset();
   }

   this.captcha = false;
    
  }
  public resolved(captchaResponse: string) {
    this.captcha = true;
  }

}
