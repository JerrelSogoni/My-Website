import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ProjectPageComponent,
    FrontPageComponent,
    ContactPageComponent,

  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpModule,
    JsonpModule,
    RecaptchaFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    RecaptchaModule.forRoot(),
    ReactiveFormsModule
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
