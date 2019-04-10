/* tslint:disable: member-ordering forin */
import { Component, OnInit, OnChanges }                  from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { ValidationService } from '../shared/validation.service';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html'
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

  heroForm: FormGroup;

  rules = [
  {
    "key": "name",
    "conditions": [
      {
        "type": "required",
        "value": "true"
      },
      {
        "type": "minLength",
        "value": 5
      },
      {
        "type": "forbiddenName",
        "value": "bob"
      }
    ] 
  }, 
  {
    "key" : "alterEgo",
    "conditions": [
     {
       "type": "compare",
       "dependent": "name",
       "operator": "!="
     } 
    ]
  },
  {
    "key": "power",
    "conditions": [
      {
        "type": "required",
        "value": "true"
      }
    ] 
  }
];

  constructor(private svc: ValidationService, private fb: FormBuilder) {
  }

  async ngOnInit() {

    console.log(this.rules);

    await this.initControls();
    this.heroForm = await this.buildContols();
    
  }

 /**
 *  
 */
  async initControls() {
    const group = this.fb.group({});
    Object.keys(this.hero).forEach(field => {

      console.log(field);
       const control = this.fb.control(
              this.hero[field], [] );
          group.addControl(field, control);
    });

    this.heroForm = group;
  }
  
 
  async buildContols() {
    const group = this.fb.group({});
    let controls = {};
    //this.svc.getRules().subscribe( (data: any[]): void => { 
        console.log('test');

      this.rules = await this.svc.getRulesAsync();
      this.rules.forEach(rule => {
          let value = this.hero[rule.key];
          const control = this.fb.control(
              value,
            this.bindValidations(rule.conditions || [])
          );
          group.addControl(rule.key, control);
      });

        // controls = {
        //   'name': new FormControl(this.hero.name, [
        //     Validators.required,
        //     Validators.minLength(4),
        //     forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //   ]),
        //   'alterEgo': new FormControl(this.hero.alterEgo),
        //   'power': new FormControl(this.hero.power, Validators.required)
        // };
   // });
    return group;
  }

  bindValidations(conditions: any) : any {
    if (conditions.length > 0) {
      const validList = [];
      conditions.forEach(condition => {
          switch(condition.type) { 
            case 'required': { 
                validList.push(Validators.required);
                break; 
            } 
            case 'minLength': { 
              validList.push(Validators.minLength(condition.value));
                break; 
            }
            case 'email': {
              validList.push(CustomValidators.email)
              break;
            }
            case 'forbiddenName': {
              var regex = new RegExp(condition.value, "i");
              validList.push(forbiddenNameValidator(regex));
              break;
            }
            default: { 
                //statements; 
                break; 
            } 
          };

        });
      return Validators.compose(validList);
    }
    return null;
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/