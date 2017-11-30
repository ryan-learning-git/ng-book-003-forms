import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Custom validator
 * @param {FormControl} control - takes a control as input
 * @returns {{[p: string]: boolean}} - Returns a StringMap<string, boolean> where the key is error code and return is true if fail
 */
function skuValidator(control: FormControl): { [s: string]: boolean} {
  const bad: boolean = control.value.match(/^123/);
  console.log('Validating: ', control, ' where bad is ', bad);
  if (!bad) {
    return {invalidSku: true};
  }
}


@Component({
  selector: 'app-demo-form-with-validations-explicit',
  templateUrl: './demo-form-with-validations-explicit.component.html',
  styleUrls: ['./demo-form-with-validations-explicit.component.css']
})
export class DemoFormWithValidationsExplicitComponent implements OnInit {

  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['a', Validators.compose([Validators.required, skuValidator])]
    });

    this.sku = this.myForm.controls['sku'];

    // for some reason this only fires correctly when the sku has a value. Otherwise value and form are always undefined.
    this.sku.valueChanges.subscribe(
      (value: string) => {
        if (!value === undefined) {
          console.log('Sku changed to ', value);
        } else {
          console.log('Sku changed to undefined');
        }
      }
    );
    this.myForm.valueChanges.subscribe(
      (form: any) => {
        if (!form === undefined) {
          console.log('Form changed to ', form);
        } else {
          console.log('Form changed to undefined');
        }
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', value, ' and form  validity is ', this.myForm.valid, ' with errors ', this.sku.hasError('invalidSku'));
  }


}
