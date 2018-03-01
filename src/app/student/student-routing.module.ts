import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';
import { StudentDegreeFormComponent } from './student-degree-form/student-degree-form.component';

const studentRoutes: Routes = [
  { path: 'student',  component: StudentComponent },
  { path: 'student/:id',  component: StudentDegreeFormComponent },
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
