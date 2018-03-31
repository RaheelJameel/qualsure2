import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  passwordString: string;
  formSubmitted: boolean;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  ok() {
    this.formSubmitted = true;
    if (this.passwordString) {
      this.activeModal.close(this.passwordString);
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
