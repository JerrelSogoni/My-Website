import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  fullpath: String;
  casual: String;
  professional: String;
  constructor() { 
  	this.fullpath = "/assets/front-page/";
  	this.casual = this.fullpath + "casual.png";
  	this.professional = this.fullpath + "professional.png";
  }

  ngOnInit() {
  }

}
