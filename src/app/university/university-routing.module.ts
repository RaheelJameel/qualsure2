import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UniversityComponent } from './university.component';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';

const univeristyRoutes: Routes = [
  { path: 'university',  component: UniversityComponent },
  { path: 'university/explore',  component: UniversityLearnMoreComponent },
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
