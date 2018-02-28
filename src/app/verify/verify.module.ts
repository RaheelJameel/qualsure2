import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/app-common.module';

import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule,
    AppCommonModule,
  ],
  declarations: [
    VerifyComponent,
  ],
  exports: [
    VerifyComponent,
  ]
})
export class VerifyModule { }
