import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerifyComponent } from './verify.component';

const verifyRoutes: Routes = [
  { path: 'verify',  component: VerifyComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(verifyRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class VerifyRoutingModule { }
