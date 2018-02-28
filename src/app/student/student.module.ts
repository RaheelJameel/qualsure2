import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/app-common.module';

import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { StudentService } from './student.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    MDBBootstrapModule.forRoot(),
    Ng2SearchPipeModule,
    FormsModule,
    AppCommonModule,
  ],
  declarations: [
    StudentComponent,
  ],
  exports: [
    StudentComponent,
  ],
  providers: [StudentService]
})
export class StudentModule { }
