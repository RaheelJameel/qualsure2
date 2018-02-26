import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CommonService, FieldValidator } from '../../../services/common.service';

@Component({
  selector: 'app-dynamic-field-info',
  templateUrl: './dynamic-field-info.component.html',
  styleUrls: ['./dynamic-field-info.component.scss']
})
export class DynamicFieldInfoComponent implements OnInit {

  @Input() fieldInfoForm: FormGroup;
  @Input() fieldIndex: number;
  @Input() requiredFields: number;
  @Input() formInvalid: boolean;
  @Input() defaultFieldValidators: FieldValidator[];

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.disableFields();
  }

  getFormControl(controlName: string): AbstractControl {
    return this.fieldInfoForm.get(controlName);
  }

  disableFields() {
    if (this.fieldIndex <= (this.requiredFields - 1)) {
      this.getFormControl('fieldName').disable();
      this.getFormControl('fieldType').disable();
    }
  }
}
