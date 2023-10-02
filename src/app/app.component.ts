import { Component } from '@angular/core';


// <!-- <app-ng-model></app-ng-model> -->
@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ng-model></app-ng-model>
      <app-ng-form></app-ng-form>
      <app-ng-form-control></app-ng-form-control>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
