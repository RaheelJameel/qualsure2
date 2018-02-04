import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';

const studentRoutes: Routes = [
  { path: 'student',  component: StudentComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class StudentRoutingModule { }
