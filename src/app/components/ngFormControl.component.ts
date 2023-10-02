import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  // Создал сервис, который туда-сюда данные преобразует.
  // API пишут бекедеры в общем виде.
  // Почему дата летит в формате ISO -> 2023-10-02(какая таймзона, есть время)
  // Иногда используеют timestamp -> new Date().getTime() -> 123455093334
  // Когда надо собрать данные с разных endpoints
  // Написать прослойку между API и формой. Трансформация API DTO(DAta transfer object) -> Form Data
  // Две функции, одна fetch -> и преобразование в форму
  // Вторая функция из формы в API DTO и применяем.

  // Мы хотим создать динамический список чего либа

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

    <div formArrayName="addresses">
      <div *ngFor="let address of addresses.controls; let i = index">
        <input type="text" [formControlName]="i" />
      </div>
    </div>

    <div class="form-group">
      <button class="btn btn-default" (click)="setTitle()">Установить title</button>
      <button class="btn btn-default" (click)="patchTitle()">Пропатчить title</button>
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

  get formTitle() {
    return this.form.get('title');
  }

  get valueTitle() {
    return this.formTitle?.value;
  }

  // форма из 5 полей, а надо только одно преобразовать

  get formPhone() {
    return {
      ...this.form.value,
      title: this.form.value.title + '100500'
    }
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), this.forbiddenNameValidator('bob')]],
      price: [null],
      company: [''],
      addresses: this.formBuilder.array([
        this.formBuilder.control('Moscow'),
        this.formBuilder.control('Kazan')
      ])
    }, { updateOn: 'blur' });

    this.form.valueChanges.subscribe((value) => {
      console.log('form', value);
    })

    this.form.get('title')?.valueChanges.subscribe((value) => {
      console.log('title', value);
    })

    this.form.get('price')?.valueChanges.subscribe((value) => {
      console.log('price', value);
    })

    this.addresses.valueChanges.subscribe((value) => {
      console.log('addresses', value);
    })
  }

  // Функция которая возвращает функцию.
  // Это нужно, чтобы передавать опции.
  // История с замыканиями
  forbiddenNameValidator(forbiddenName: string) {
    // В замыкании опции forbiddenName
    return (control: FormControl) => {
      // Есть условия проверки валидности формы или input-а
      const forbidden = control.value === forbiddenName;

      // В специальном формате ошибку или null
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (!password || !confirmPassword) {
      // password.setErrors

      return null;
    }

    const passwordMismatch = password.value === confirmPassword.value;

    if (passwordMismatch) {
      // password.setErrors(['passwordMismatch'])
    }
  
    return passwordMismatch ? null : { passwordMismatch: true };
  }
  

  setTitle() {
    this.form.setValue({
      ...this.form.value,
      titlee: this.form.value.title + 'Set 100500'
    })
  }

  patchTitle() {
    this.form.patchValue({
      titlee: this.form.value.title + 'Set 100500'
    })
  }

  addPhone() {
    console.log(this.form.value);

    if (this.form.valid) {
      this.phones.push(this.formPhone);
    }
  }

  // , [Validators.required, Validators.minLength(4), this.forbiddenNameValidator('bob')]
  // , Validators.required

  
  
}
