import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DegreeFormComponent } from './degree-form/degree-form.component';
import { DegreeFormFieldComponent } from './degree-form/degree-form-field/degree-form-field.component';

import { ConfirmChangesComponent } from './modals/confirm-changes/confirm-changes.component';
import { InfoDialogComponent } from './modals/info-dialog/info-dialog.component';
import { PasswordDialogComponent } from './modals/password-dialog/password-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    TextMaskModule,
  ],
  declarations: [
    HeaderFooterComponent,
    PageNotFoundComponent,
    DegreeFormComponent,
    DegreeFormFieldComponent,
    ConfirmChangesComponent,
    InfoDialogComponent,
    PasswordDialogComponent,
  ],
  exports: [
    HeaderFooterComponent,
    PageNotFoundComponent,
    DegreeFormComponent,
    DegreeFormFieldComponent,
  ],
  entryComponents: [
    ConfirmChangesComponent,
    InfoDialogComponent,
    PasswordDialogComponent,
  ],
})
export class AppCommonModule { }
