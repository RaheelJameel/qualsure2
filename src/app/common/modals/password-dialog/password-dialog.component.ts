import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  passwordForm: FormGroup;
  formSubmitted: boolean;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });
  }

  ok() {
    this.formSubmitted = true;
    if (this.passwordForm.valid) {
      this.activeModal.close(this.passwordForm.get('password').value);
    }
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
