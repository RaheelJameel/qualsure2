import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppCommonModule } from '../common/app-common.module';

import { UniversityComponent } from './university.component';
import { UniversityRoutingModule } from './university-routing.module';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UniversityViewDegreesComponent } from './university-view-degrees/university-view-degrees.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule  } from "@angular/forms";     
import { TokenStorage } from "./token.storage";
import { AuthGuard } from "./auth-guard.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './university.interceptor';
import {Ng2Webstorage} from 'ngx-webstorage';
import { CoolStorageModule } from 'angular2-cool-storage';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UniversityEditFormComponent } from './university-edit-form/university-edit-form.component';
import { DynamicFieldInfoComponent } from './university-edit-form/dynamic-field-info/dynamic-field-info.component';
import { UniversityAddDegreeComponent } from './university-add-degree/university-add-degree.component';
import { UniversityHomeComponent } from './university-home/university-home.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PendingChangesGuard } from './pending-changes-guard';

@NgModule({
  imports: [
    CommonModule,
    UniversityRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng2Webstorage,
    CoolStorageModule,
    MDBBootstrapModule.forRoot(),
    AppCommonModule,
    NgbModule,
    TextMaskModule,
  ],
  declarations: [
    UniversityComponent,
    UniversityLearnMoreComponent,
    UniversityViewDegreesComponent,
    UniversityEditFormComponent,
    DynamicFieldInfoComponent,
    UniversityAddDegreeComponent,
    UniversityHomeComponent,
  ],
  exports: [
    UniversityComponent,
    UniversityLearnMoreComponent,
    UniversityViewDegreesComponent,
  ],
  providers: [
    HttpClientModule,
    TokenStorage,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    PendingChangesGuard,
    ],
})
export class UniversityModule { }
