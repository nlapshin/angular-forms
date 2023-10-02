import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  template: `
    <form [formGroup]="myForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" formControlName="name">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email">
      </div>
      <div>
        <label for="age">Age:</label>
        <input type="number" id="age" formControlName="age">
      </div>
    </form>
  `,
})
export class MyFormComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, Validators.min(18)],
    });
  }
}
