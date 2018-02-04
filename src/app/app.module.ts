import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderFooterComponent } from './common/header-footer/header-footer.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

import { HomeComponent } from './home/home.component';

import { UniversityComponent } from './university/university.component';
import { UniversityRoutingModule } from './university/university-routing.module';

import { StudentComponent } from './student/student.component';

import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UniversityComponent,
    StudentComponent,
    VerifyComponent,
    HeaderFooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UniversityRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ]
})
export class AppModule { }
