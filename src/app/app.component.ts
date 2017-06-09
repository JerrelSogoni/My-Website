import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-menu-bar></app-menu-bar>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My first Angular App';
  hero = "WindStorm";
}
