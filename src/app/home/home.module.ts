import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppCommonModule } from '../common/app-common.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    AppCommonModule,
    NgbModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
