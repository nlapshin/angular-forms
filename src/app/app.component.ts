import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ng-model></app-ng-model>
      <app-ng-form></app-ng-form>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
