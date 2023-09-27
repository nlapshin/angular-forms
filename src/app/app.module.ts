import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppNgFormComponent } from './components/ngForm.component';
import { AppNmModelComponent } from './components/ngModel.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNgFormComponent,
    AppNmModelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent, AppNgFormComponent, AppNmModelComponent]
})
export class AppModule { }
