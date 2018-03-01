import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { UniversityService } from '../../university/university.service';

import { CommonService, FieldGroup, FieldValidator, FieldGroupAPI } from '../../services/common.service';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.scss']
})
export class DegreeFormComponent implements OnInit {

  @Input() uniID: string;
  @Input() buttonLabel = 'Add';
  @Input() independentCheck: boolean;
  @Output() outputValue = new EventEmitter<any>();
  formFields: FieldGroupAPI[];
  fieldForm: FormGroup;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
  ) { }

  ngOnInit() {
    this.fieldForm = new FormGroup({
      fieldArray: new FormArray([]),
    });
    this.getFormFieldsAndMakeForm();
  }

  getFormFieldsAndMakeForm() {
    this.universityService.getFormFields(this.uniID, this.independentCheck)
      .subscribe((response) => {
        if (response.body) {
          this.formFields = response.body;
          this.makeForm();
        }},
        error => {
          console.error(error);
        }
      );
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

  giveOutput() {
    const formValue: any[] = this.fieldForm.getRawValue()['fieldArray'];
    const degreeObject = {
      studentName: formValue[0],
      gpa: formValue[1],
      graduationYear: formValue[2],
      degreeType: formValue[3],
      degreeName: formValue[4]
    };
    for (let i = 5; i < formValue.length; i++) {
      degreeObject[this.formFields[i].name] = formValue[i];
    }
    console.log('giveOutput:', degreeObject);
    this.outputValue.emit(degreeObject);
    // this.router.navigate(['/university']);
  }

}
