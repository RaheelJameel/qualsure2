import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppCommonModule } from './common/app-common.module';
import { HomeModule } from './home/home.module';
import { UniversityModule } from './university/university.module';
import { StudentModule } from './student/student.module';
import { VerifyModule } from './verify/verify.module';


@NgModule({
  declarations: [
    AppComponent,
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
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
export class AppModule { }
