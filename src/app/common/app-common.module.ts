import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    HeaderFooterComponent,
    PageNotFoundComponent,
  ],
  exports: [
    HeaderFooterComponent,
    PageNotFoundComponent,
  ]
})
export class AppCommonModule { }
