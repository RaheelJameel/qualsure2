import { FormControl } from '@angular/forms';
export const EmptyStringValidator = (formControl: FormControl) => {
  if (typeof formControl.value === 'string') {
    return formControl.value.length === 0 ? null :
      formControl.value.trim().length > 0 ? null : {
        emptyString: {
          valid: false
        }
      };
  }
  return null;
};
