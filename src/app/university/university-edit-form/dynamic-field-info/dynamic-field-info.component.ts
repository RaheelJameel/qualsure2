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
  @Input() id = 0;
  optionsSelect1;
  optionsSelect2;
  refinedValidators: FieldValidator[];
  isRange: boolean;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.disableFields();
  //  console.log(this.fieldInfoForm.get('fieldType').value);
    this.refinedValidators = this.getRefinedValidators(this.fieldInfoForm.get('fieldType').value);
    this.isRange = false;
    if (this.fieldInfoForm.get('fieldValidations').value === 'Range') {
           this.isRange = true;
    }
    // this.fieldInfoForm.addControl('min', new FormControl('', Validators.required));
    // this.fieldInfoForm.addControl('max', new FormControl('', Validators.required));

    this.onChanges();
  }
  onChanges(): void {
    this.fieldInfoForm.get('fieldType').valueChanges.subscribe(validatorType => {
   //   console.log('valueee= ' + validatorType);
      if (validatorType !== 'number') {
        this.isRange = false;
      }
      this.refinedValidators = this.getRefinedValidators(validatorType);
    });
    this.fieldInfoForm.get('fieldValidations').valueChanges.subscribe(validator => {
      if (validator === 'Range') {
          if (!(this.fieldInfoForm.contains('min') && this.fieldInfoForm.contains('max')) ) {
          this.fieldInfoForm.addControl('min', new FormControl('', Validators.required));
          this.fieldInfoForm.addControl('max', new FormControl('', Validators.required));
          }
        this.isRange = true;
      } else {
        if (this.fieldInfoForm.contains('min') && this.fieldInfoForm.contains('max') ) {
          this.fieldInfoForm.removeControl('min');
          this.fieldInfoForm.removeControl('max');
          }

        this.isRange = false;
      }
       });
       // continue work from here
    // this.fieldInfoForm.get('min').valueChanges.subscribe(min => {
    //   this.fieldInfoForm.get('fieldValidations').
    //       });
    // this.fieldInfoForm.get('max').valueChanges.subscribe(max => {
    //          if (validator === 'Range') {
    //            this.isRange = true;
    //          }
    //           });
  }

  getRefinedValidators(validatorType): FieldValidator[] {
   return this.defaultFieldValidators.map((validator) => {
     if (validatorType === 'cnic') {
      if (validatorType === validator.type) {
        return validator;
      }
     } else {
      if (validatorType === validator.type || validator.name === 'None') {
        return validator;
      }
    }
    }).filter(x => !!x) as FieldValidator[] ;

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
