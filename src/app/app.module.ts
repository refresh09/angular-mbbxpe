import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AppComponent }           from './app.component';
import { HeroFormTemplateComponent } from './template/hero-form-template.component';
import { HeroFormReactiveComponent } from './reactive/hero-form-reactive.component';
import { ForbiddenValidatorDirective } from './shared/forbidden-name.directive';
import { FieldsMatchDirective } from './shared/fields-match.directive';
import { JsonService } from './shared/json.service';
import { ValidationService } from './shared/validation.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule
  ],
  declarations: [
    AppComponent,
    HeroFormTemplateComponent,
    HeroFormReactiveComponent,
    FieldsMatchDirective,
    ForbiddenValidatorDirective
  ],
  providers: [ 
    JsonService,
    ValidationService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/