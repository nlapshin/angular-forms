import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class Phone{
  constructor(public title: string, 
              public price: number, 
              public company: string)
  { }
}

export interface IForm {
  title: string;
  price: number;
  company: string;
}

@Component({
  selector: 'app-ng-form-control',
  template: `
  <div class="form-group" [formGroup]="form">
    <div>
        <label>Название модели</label>
        <input class="form-control" formControlName="title" />
        <div *ngIf="form.get('title')?.invalid && (form.get('title')?.dirty || form.get('title')?.touched)"
            class="alert">
        <div *ngIf="form.get('title')?.hasError('required')">Name is required.</div>
        <div *ngIf="form.get('title')?.hasError('minlength')">Name must be at least 4 characters long.</div>
        <div *ngIf="form.get('title')?.hasError('forbiddenName')">Name cannot be Bob.</div>
        </div>
    </div>

    <div class="form-group">
        <label>Цена</label>
        <input type="number" class="form-control" formControlName="price" />
    </div>

    <div class="form-group">
        <label>Производитель</label>
        <select class="form-control" formControlName="company">
        <option *ngFor="let comp of companies" [value]="comp">{{ comp }}</option>
        </select>
    </div>

    <div class="form-group">
        <button class="btn btn-default" (click)="addPhone()">Добавить</button>
    </div>
    </div>

    <div>
    <h3>Добавленные элементы</h3>
    <ul>
        <li *ngFor="let p of phones">{{ p.title }} ({{ p.company }}) - {{ p.price }}</li>
    </ul>
    </div>
  `
})
export class AppNgFormControlComponent {
    form: FormGroup;
    phones: Phone[] = [];
    companies: string[] = ["Apple", "Huawei", "Xiaomi", "Samsung", "LG", "Motorola", "Alcatel"];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), this.forbiddenNameValidator('bob')]],
      price: [null, Validators.required],
      company: [''],
    });
  }

  // Custom validator function for the 'title' field
  forbiddenNameValidator(forbiddenName: string) {
    return (control: FormControl) => {
      const forbidden = control.value === forbiddenName;
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  // Function to add a new phone to the list
  addPhone() {
    if (this.form.valid) {
      const phone = {
        title: this.form.get('title')?.value,
        price: this.form.get('price')?.value,
        company: this.form.get('company')?.value,
      };
      this.phones.push(phone);
    }
  }
}


// function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   if (!password || !confirmPassword) {
//     return null;
//   }

//   return password.value === confirmPassword.value ? null : { passwordMismatch: true };
// }
