import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'


@Component({
  selector: 'app-ng-form',
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name100500" ngModel required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" ngModel required email>
      </div>

      <button type="submit" [disabled]="myForm.invalid">Submit</button>
    </form>
  `
})
export class AppNgFormComponent {
  onSubmit(myForm: NgForm) {
    if (myForm.invalid) {
      // doSomething();
      // Скролл до элемента который с ошибкой.
      // toast показать
    };
  }
}
