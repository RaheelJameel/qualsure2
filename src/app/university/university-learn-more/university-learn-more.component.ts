import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UnsavedChangesErrorMsg } from '../../common/constants';

import { ComponentCanDeactivate } from '../pending-changes-guard';

@Component({
  selector: 'app-university-learn-more',
  templateUrl: './university-learn-more.component.html',
  styleUrls: ['./university-learn-more.component.scss']
})
export class UniversityLearnMoreComponent implements OnInit, ComponentCanDeactivate {

  constructor() { }

  ngOnInit() {
  }

  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = UnsavedChangesErrorMsg;
    }
  }

}
