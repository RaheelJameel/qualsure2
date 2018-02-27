import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DegreeFormComponent } from './degree-form/degree-form.component';
import { DegreeFormFieldComponent } from './degree-form/degree-form-field/degree-form-field.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    HeaderFooterComponent,
    PageNotFoundComponent,
    DegreeFormComponent,
    DegreeFormFieldComponent,
  ],
  exports: [
    HeaderFooterComponent,
    PageNotFoundComponent,
  ]
})
export class AppCommonModule { }
