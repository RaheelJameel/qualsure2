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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { UniversityDegreeService } from './university/university-degree.service';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {Ng2Webstorage} from 'ngx-webstorage';
import { CoolStorageModule } from 'angular2-cool-storage';
import { StudentService } from './student/student.service';

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
    Ng2Webstorage,
    CoolStorageModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }),
    
    Ng2OrderModule,
    Ng2SearchPipeModule,
  ],
  providers: [UniversityService, MessageService,HttpClientModule, UniversityDegreeService, StudentService],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class AppModule { }
