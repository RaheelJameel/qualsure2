import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-changes',
  templateUrl: './confirm-changes.component.html',
  styleUrls: ['./confirm-changes.component.scss']
})
export class ConfirmChangesComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.close(false);
  }

}
