import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DegreeFormComponent } from './degree-form/degree-form.component';
import { DegreeFormFieldComponent } from './degree-form/degree-form-field/degree-form-field.component';

import { ConfirmChangesComponent } from './modals/confirm-changes/confirm-changes.component';
import { InfoDialogComponent } from './modals/info-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
  ],
  exports: [
    HeaderFooterComponent,
    PageNotFoundComponent,
    DegreeFormComponent,
    DegreeFormFieldComponent,
  ],
  entryComponents: [
    ConfirmChangesComponent,
  ],
})
export class AppCommonModule { }
