import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-menu-bar></app-menu-bar>
  			 <app-front-page></app-front-page>
  			 <app-project-page></app-project-page>
  			 <app-contact-page></app-contact-page>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
