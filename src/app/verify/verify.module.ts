import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule,
  ],
  declarations: [
    VerifyComponent,
  ],
  exports: [
    VerifyComponent,
  ]
})
export class VerifyModule { }
