import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { UniversityComponent } from './university.component';
import { UniversityRoutingModule } from './university-routing.module';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UniversityRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    UniversityComponent,
    UniversityLearnMoreComponent,
  ],
  exports: [
    UniversityComponent,
    UniversityLearnMoreComponent,
  ],
  providers: [HttpClientModule],
})
export class UniversityModule { }
