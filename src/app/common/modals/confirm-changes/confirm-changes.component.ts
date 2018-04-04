import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-changes',
  templateUrl: './confirm-changes.component.html',
  styleUrls: ['./confirm-changes.component.scss']
})
export class ConfirmChangesComponent implements OnInit {

  @Input() title = 'Unsaved Changes';
  @Input() message = 'You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.';
  @Input() confirmButtonText = 'OK';
  @Input() cancelButtonText = 'Cancel';

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
