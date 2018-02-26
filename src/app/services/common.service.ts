import { Injectable } from '@angular/core';

export const DefaultFormArray: FieldGroup[] = [
  {
    name: 'StudentName',
    type: 'Text',
    validator: {
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    },
    customError: 'Username is incorrect'
  },
  {
    name: 'GPA',
    type: 'Number',
    validator: {
      name:  '0.00 - 4.00',
      regex: '[0-4].?[0-9][0-9]',
      type: 'number'
    },
    customError: 'GPA is incorrect'
  },
  {
    name: 'DegreeType',
    type: 'Text',
    validator: {
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    },
    customError: 'DegreeType is incorrect'
  },
  {
    name: 'DegreeName',
    type: 'Text',
    validator: {
      name:  'Alpha Numeric',
      regex: '[A-Za-z0-9]+',
      type: 'text'
    },
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

export interface FieldValidator {
  name:  string;
  regex: string;
  type: string;
}

@Injectable()
export class CommonService {

  private previousForm: FieldGroup[];

  constructor() { }

  getDefaultForm(): FieldGroup[] {
    return DefaultFormArray;
  }

  getForm(): FieldGroup[] {
    if (this.previousForm) {
      console.log('CommonService getForm(): giving Previous Form', this.previousForm);
      return this.previousForm;
    } else {
      console.log('CommonService getForm(): giving Default Form', this.getDefaultForm());
      return this.getDefaultForm();
    }
  }

  setForm(newForm: FieldGroup[]) {
    this.previousForm = newForm;
  }

  clearForm() {
    this.previousForm = null;
  }

  getDefaultFieldValidators(): FieldValidator[] {
    return DefaultValidators;
  }

}
