import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppNgFormComponent } from './components/ngForm.component';
import { AppNgFormControlComponent } from './components/ngFormControl.component';
import { AppNmModelComponent } from './components/ngModel.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNgFormComponent,
    AppNmModelComponent,
    AppNgFormControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent, AppNgFormComponent, AppNmModelComponent]
})
export class AppModule { }
