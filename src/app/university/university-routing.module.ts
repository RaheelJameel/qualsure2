import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UniversityComponent } from './university.component';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';
import { UniversityEditFormComponent } from './university-edit-form/university-edit-form.component';
import { UniversityViewDegreesComponent} from './university-view-degrees/university-view-degrees.component';
import {AuthGuard} from './auth-guard.service';
const univeristyRoutes: Routes = [
  { path: 'university',  component: UniversityComponent },
  { path: 'university/explore',  component: UniversityLearnMoreComponent },
  { path: 'university/:id/degrees',  component: UniversityViewDegreesComponent, canActivate: [AuthGuard] },
  { path: 'university/edit-form',  component: UniversityEditFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(univeristyRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class UniversityRoutingModule { }
