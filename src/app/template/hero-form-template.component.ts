/* tslint:disable: member-ordering */
import { Component, ViewChild } from '@angular/core';
import { NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form-template',
  templateUrl: './hero-form-template.component.html'
})
export class HeroFormTemplateComponent {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

  @ViewChild('name') 
  private name: NgModel;

  @ViewChild('alterEgo') 
  private alterEgo: NgModel;

  ngAfterViewInit() {
    this.name.valueChanges.subscribe(x => {
      if (x === 'abcde') {
      this.alterEgo.control.setValidators(Validators.compose([this.alterEgo.control.validator, Validators.required]));
      } else {
        this.alterEgo.control.clearValidators();
      }
      this.alterEgo.control.updateValueAndValidity();
    });
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/