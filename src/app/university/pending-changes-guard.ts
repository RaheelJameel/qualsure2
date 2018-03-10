// Solutiion Taken from
// https://stackoverflow.com/a/41187919
// https://stackoverflow.com/a/42108319

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmChangesComponent } from '../common/modals/confirm-changes/confirm-changes.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(
    private modalService: NgbModal,
  ) {}

  async canDeactivate(component: ComponentCanDeactivate): Promise<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    if (component.canDeactivate()) {
      return true;
    } else {
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      return await this.modalService.open(ConfirmChangesComponent, { backdrop: 'static', windowClass: 'align-modal' }).result;
    }
  }
}
