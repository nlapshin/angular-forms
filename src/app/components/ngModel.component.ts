import { Component } from '@angular/core';

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
  selector: 'app-ng-model',
  template: `
    <div> 
        <div class="form-group">
            <label>Название модели</label>
            <input class="form-control" name="title" [(ngModel)]="form.title" [ngModelOptions]="{ updateOn: 'blur' }" #title="ngModel" appForbiddenName="bob" (ngModelChange)="onTitleChange()" required minlength="4" />
            <div *ngIf="title.invalid && (title.dirty || title.touched)"
              class="alert">

            <div *ngIf="title.errors?.['required']">
              Name is required.
            </div>
            <div *ngIf="title.errors?.['minlength']">
              Name must be at least 4 characters long.
            </div>
            <div *ngIf="title.errors?.['forbiddenName']">
              Name cannot be Bob.
            </div>

          </div>      

          </div>
        <div class="form-group">
            <label>Цена</label>
            <input type="number" class="form-control" name="price" [(ngModel)]="form.price" />
        </div>
        <div class="form-group">
            <label>Производитель</label>
            <select class="form-control" name="company" [(ngModel)]="form.company">
                <option  *ngFor="let comp of companies" [value]="comp">
                    {{comp}}
                </option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-default" (click)="addPhone()">Добавить</button>
        </div>
  </div>
  <div><h3>Добавленные элементы</h3>
        <ul>
            <li *ngFor="let p of phones">{{p.title}} ({{p.company}}) - {{p.price}}</li>
        </ul>
  </div>
  `
})
export class AppNmModelComponent {
  form: IForm = {
    title: "",
    price: 0,
    company: "",
  }

  phones: Phone[] = [];
  companies: string[] = ["Apple", "Huawei", "Xiaomi", "Samsung", "LG", "Motorola", "Alcatel"];
  
  addPhone(){
      this.phones.push(new Phone(this.form.title, this.form.price, this.form.company));
  }

  onTitleChange() {
    console.log('test')
  }
}
