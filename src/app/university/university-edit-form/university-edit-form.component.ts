import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { CommonService, FieldGroup } from '../../services/common.service';
import { EmptyStringValidator } from '../../common/validators/empty-string-validator';

@Component({
  selector: 'app-university-edit-form',
  templateUrl: './university-edit-form.component.html',
  styleUrls: ['./university-edit-form.component.scss']
})
export class UniversityEditFormComponent implements OnInit {

  editForm: FormGroup;
  formModel: FieldGroup[];
  requiredFields: number;
  formInvalid: boolean;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.requiredFields = 4;
    this.editForm = this.formBuilder.group({
      fieldArray: new FormArray([]),
      // fieldArray: this.formBuilder.array([
      //   this.createFieldFormGroup(),
      //   this.createFieldFormGroup()
      // ]),
    });
    this.initForm();
  }

  createFieldFormGroup(fieldGroup?: FieldGroup): FormGroup {
    return this.formBuilder.group({
      fieldName: [fieldGroup ? fieldGroup.name : '', [Validators.required, EmptyStringValidator]],
      fieldType: [fieldGroup ? fieldGroup.type : 'Text'],
      fieldValidations: [fieldGroup ? fieldGroup.validator : 'None'],
      fieldErrorMsg: [fieldGroup ? fieldGroup.customError : '']
    });
  }

  addField(fieldGroup?: FieldGroup) {
    this.formInvalid = false;
    this.editFieldArray.push(this.createFieldFormGroup(fieldGroup));
  }

  removeField(index: number) {
    this.formInvalid = false;
    this.editFieldArray.removeAt(index);
  }

  initForm() {
    this.formModel = this.commonService.getForm();
    for (let i = 0; i < this.formModel.length; i++) {
      this.addField(this.formModel[i]);
    }
  }

  get editFieldArray(): FormArray {
    return this.editForm.get('fieldArray') as FormArray;
  }

  get formValue(): any[] {
    return this.editForm.getRawValue()['fieldArray'];
  }

  get formApiValue(): FieldGroup[] {
    return this.formValue.map((value) => {
      return {
        name: value.fieldName,
        type: value.fieldType,
        validator: value.fieldValidations,
        customError: value.fieldErrorMsg
      };
    });
  }

  save() {
    this.formInvalid = false;
    if (this.editForm.valid) {
      console.log(this.formApiValue);
      this.commonService.setForm(this.formApiValue);
    } else {
      this.formInvalid = true;
    }
  }
}
