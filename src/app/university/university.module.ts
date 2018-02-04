import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityComponent } from './university.component';
import { UniversityRoutingModule } from './university-routing.module';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';

@NgModule({
  imports: [
    CommonModule,
    UniversityRoutingModule,
  ],
  declarations: [
    UniversityComponent,
    UniversityLearnMoreComponent,
  ],
  exports: [
    UniversityComponent,
    UniversityLearnMoreComponent,
  ]
})
export class UniversityModule { }
