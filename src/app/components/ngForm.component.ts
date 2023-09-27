import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-form',
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" ngModel required>
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
  onSubmit(formData: any) {
    console.log(formData);
  }
}
