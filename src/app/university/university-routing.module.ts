import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UniversityComponent } from './university.component';
import { UniversityHomeComponent } from './university-home/university-home.component';
import { UniversityLearnMoreComponent } from './university-learn-more/university-learn-more.component';
import { UniversityEditFormComponent } from './university-edit-form/university-edit-form.component';
import { UniversityViewDegreesComponent} from './university-view-degrees/university-view-degrees.component';
import { UniversityAddDegreeComponent } from './university-add-degree/university-add-degree.component';
import {UniversityWalletComponent} from './university-wallet/university-wallet.component';
import { PendingChangesGuard } from './pending-changes-guard';
import {UniversityMultipleAddDegreeComponent} from './university-multiple-add-degree/university-multiple-add-degree.component'
import {AuthGuard} from './auth-guard.service';
import { AuthGuardEditForm } from './auth-guard-edit-form.service';
const univeristyRoutes: Routes = [
  {
    path: 'university',
    component: UniversityComponent,
    children: [
      { path: '', component: UniversityHomeComponent, canDeactivate: [PendingChangesGuard] },
      { path: 'explore',  component: UniversityLearnMoreComponent, canDeactivate: [PendingChangesGuard] },
      { path: 'degrees',  component: UniversityViewDegreesComponent, canActivate: [AuthGuard] },
      { path: 'edit-form',  component: UniversityEditFormComponent , canActivate: [AuthGuardEditForm] },
      { path: 'wallet',  component: UniversityWalletComponent , canActivate: [AuthGuard]  },
      { path: 'add-degree',  component: UniversityAddDegreeComponent , canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard]  },
      { path: 'add-multiple-degrees',  component: UniversityMultipleAddDegreeComponent   }

    ]
  },
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
