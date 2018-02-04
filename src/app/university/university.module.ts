import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityComponent } from './university.component';
import { UniversityRoutingModule } from './university-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UniversityRoutingModule,
  ],
  declarations: [
    UniversityComponent,
  ],
  exports: [
    UniversityComponent,
    UniversityRoutingModule,
  ]
})
export class UniversityModule { }
