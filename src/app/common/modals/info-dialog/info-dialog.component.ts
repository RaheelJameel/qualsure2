import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  @Input() title = 'Info Dialog';
  @Input() message = 'This is a info dialog';
  @Input() buttonText = 'OK';

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  ok() {
    this.activeModal.close(true);
  }

}
