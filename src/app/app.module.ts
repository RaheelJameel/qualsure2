import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppCommonModule } from './common/app-common.module';
import { HomeModule } from './home/home.module';
import { UniversityModule } from './university/university.module';
import { StudentModule } from './student/student.module';
import { VerifyModule } from './verify/verify.module';
import { UniversityService } from './university/university.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './messages/message.service';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppCommonModule,
    HomeModule,
    UniversityModule,
    StudentModule,
    VerifyModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [UniversityService, MessageService,HttpClientModule],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class AppModule { }
