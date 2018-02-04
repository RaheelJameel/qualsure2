import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
  ],
  declarations: [
    StudentComponent,
  ],
  exports: [
    StudentComponent,
  ]
})
export class StudentModule { }
