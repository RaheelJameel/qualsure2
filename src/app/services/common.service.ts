import { Injectable } from '@angular/core';

export const DefaultFormArray: FieldGroupAPI[] = [
  {
    name: 'StudentName',
    attributeType: 'Text',
    validators: [{
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    }],
    customError: 'Username is incorrect'
  },
  {
    name: 'GPA',
    attributeType: 'Number',
    validators: [{
      name:  '0.00 - 4.00',
      regex: '[0-4].?[0-9][0-9]',
      type: 'number'
    }],
    customError: 'GPA is incorrect'
  },
  {
    name: 'DegreeType',
    attributeType: 'Text',
    validators: [{
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    }],
    customError: 'DegreeType is incorrect'
  },
  {
    name: 'DegreeName',
    attributeType: 'Text',
    validators: [{
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    }],
    customError: 'DegreeName is incorrect'
  }
];

export const DefaultValidators: FieldValidator[] = [
  {
    name:  'None',
    regex: 'none',
    type: 'all'
  },
  {
    name:  'Alpha Numeric',
    regex: '[A-Za-z0-9]+',
    type: 'text'
  },
  {
    name:  'Alphabets Only',
    regex: '[A-Za-z]+',
    type: 'text'
  },
  {
    name:  '0.00 - 4.00',
    regex: '[0-4].?[0-9][0-9]',
    type: 'number'
  },
];

export interface FieldGroup {
  name: string;
  type: string;
  validator: FieldValidator;
  customError: string;
}

export interface FieldGroupAPI {
  name: string;
  attributeType: string;
  validators: FieldValidator[];
  customError: string;
}

export interface FieldValidator {
  name:  string;
  regex: string;
  type: string;
}

@Injectable()
export class CommonService {

  private previousForm: FieldGroupAPI[];

  constructor() { }

  getDefaultForm(): FieldGroupAPI[] {
    return DefaultFormArray;
  }

  isFormSaved(): boolean {
    return !!this.previousForm;
  }

  getForm(): FieldGroupAPI[] {
    if (this.previousForm) {
      return this.previousForm;
    } else {
      return this.getDefaultForm();
    }
  }

  setForm(newForm: FieldGroupAPI[]) {
    this.previousForm = newForm;
  }

  clearForm() {
    this.previousForm = null;
  }

  getDefaultFieldValidators(): FieldValidator[] {
    return DefaultValidators;
  }

}
