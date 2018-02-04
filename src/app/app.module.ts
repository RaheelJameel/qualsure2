import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UniversityComponent } from './university/university.component';
import { StudentComponent } from './student/student.component';
import { VerifyComponent } from './verify/verify.component';
import { HeaderFooterComponent } from './common/header-footer/header-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UniversityComponent,
    StudentComponent,
    VerifyComponent,
    HeaderFooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
