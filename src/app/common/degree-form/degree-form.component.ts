import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService, FieldGroup, FieldValidator, FieldGroupAPI } from '../../services/common.service';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.scss']
})
export class DegreeFormComponent implements OnInit {

  fieldForm: FormGroup;
  formFields: FieldGroupAPI[];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fieldForm = new FormGroup({
      fieldArray: new FormArray([]),
    });
    this.getFormFields();
    this.makeForm();
  }

  getFormFields() {
    this.formFields = this.commonService.getForm();
  }

  get formFieldArray(): FormArray {
    return this.fieldForm.get('fieldArray') as FormArray;
  }

  makeForm() {
    this.formFields.forEach((fieldGroup: FieldGroupAPI) => {
      this.formFieldArray.push(
          new FormControl('')
      );
    });
  }

  redirect() {
    this.router.navigate(['/university']);
  }

}
