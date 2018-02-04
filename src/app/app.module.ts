import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
