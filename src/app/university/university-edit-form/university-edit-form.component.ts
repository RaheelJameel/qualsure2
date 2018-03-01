import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


import { CommonService, FieldGroup, FieldValidator, FieldGroupAPI } from '../../services/common.service';
import { EmptyStringValidator } from '../../common/validators/empty-string-validator';

import { UniversityService } from '../university.service';
import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

@Component({
  selector: 'app-university-edit-form',
  templateUrl: './university-edit-form.component.html',
  styleUrls: ['./university-edit-form.component.scss']
})
export class UniversityEditFormComponent implements OnInit {

  editForm: FormGroup;
  formModel: FieldGroupAPI[];
  requiredFields: number;
  formInvalid: boolean;
  defaultFieldValidators: FieldValidator[];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getDefaultValidators();
    this.requiredFields = 5;
    this.editForm = this.formBuilder.group({
      fieldArray: new FormArray([]),
    });
    this.checkUniInfoAndInitForm();
  }
  success(message: string) {
    this.alertService.success(message);
}

  error(message: string) {
    this.alertService.error(message);
  }


  getUniversityInfo() {
    this.universityService.getInfo
      .subscribe(response => {
        if (response.body) {}
      },
      error => {
        console.error(error);
      });
  }

  createFieldFormGroup(fieldGroup?: FieldGroupAPI): FormGroup {
    return this.formBuilder.group({
      fieldName: [fieldGroup ? fieldGroup.name : '', [Validators.required, EmptyStringValidator]],
      fieldType: [fieldGroup ? fieldGroup.attributeType : 'text'],
      fieldValidations: [fieldGroup ? (fieldGroup.validators ? fieldGroup.validators[0].name : 'None') : 'None'],
      fieldErrorMsg: [fieldGroup ? fieldGroup.customError : '']
    });
  }

  addField(fieldGroup?: FieldGroupAPI) {
    this.formInvalid = false;
    this.editFieldArray.push(this.createFieldFormGroup(fieldGroup));
  }

  removeField(index: number) {
    this.formInvalid = false;
    this.editFieldArray.removeAt(index);
  }

  initFormFields() {
    for (let i = 0; i < this.formModel.length; i++) {
      this.addField(this.formModel[i]);
    }
  }

  checkUniInfoAndInitForm() {
    this.universityService.getInfo
      .subscribe(response => {
        if (response.body) {
          this.initForm();
        }
      },
      error => {
        console.error(error);
      });
  }

  initForm() {
    this.universityService.getFormFields()
      .subscribe((response) => {
        if (response.body) {
          console.log('----------------initForm():', response);
          console.log(response.body);
          this.formModel = response.body;
          this.initFormFields();
        }},
        error => {
          console.error(error);
        }
      );
  }

  getDefaultValidators() {
    this.universityService.getDefaultValidators()
      .subscribe(
        response => {
        if (response.body) {
          console.log(response.body);
          this.defaultFieldValidators = response.body;
        }},
        error => {
          console.error(error);
        }
      );
  }

  get editFieldArray(): FormArray {
    return this.editForm.get('fieldArray') as FormArray;
  }

  get formValue(): any[] {
    return this.editForm.getRawValue()['fieldArray'];
  }

  get formApiValue(): FieldGroupAPI[] {
    return this.formValue.map((value) => {
      return {
        name: value.fieldName,
        attributeType: value.fieldType,
        validators: [this.searchFieldValidators(value.fieldValidations)],
        customError: value.fieldErrorMsg
      };
    });
  }

  searchFieldValidators(searchName: string): FieldValidator {
    return this.defaultFieldValidators.filter((fieldValidator: FieldValidator) => {
      return fieldValidator.name === searchName;
    })[0];
  }

  save() {
    this.formInvalid = false;
    if (this.editForm.valid) {
      console.log(this.formApiValue);
      this.commonService.setForm(this.formApiValue);
      this.universityService.saveFormFields(this.formApiValue)
        .subscribe(
        response => {
        if (response) {
          this.success('Form Edited Successfully');
          setTimeout(() => {
            this.router.navigate(['/university']);
          }, 3000);
        }},
        error => {
          console.error(error);
        }
      );
    } else {
      this.formInvalid = true;
    }
  }
}
