import { Injectable }         from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { forbiddenNameValidator } from './forbidden-name.directive';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs/add/operator/map";
 

@Injectable()
export class ValidationService {

 constructor(private http: HttpClient) { }


  async getRulesAsync(): Promise<any> {
    const response = await this.http.get('../assets/rules.json').toPromise();
    return response;
  }


  getRules() : Observable<any>  {
    return this.http
             .get('../assets/rules.json')
             .map((response: any) => {
                 return response;
             });
  }

/**
 * Builds the UI validation rules for reactive form 
 */
  buildReactiveFormRules(group: FormGroup, rules: any[]) {
    let formGroup: any = {};
    
    rules.forEach(rule => {
      let validators = this.buildValidators(group.controls, rule.conditions);
      console.log(validators);
      formGroup[rule.key] = new FormControl(rule.key,validators )      
    })

    return new FormGroup(formGroup);
  }

  buildTemplateFormRules() {

  }

  /**
   * builds validators for form control
   */
  buildValidators(formControls: any, conditions: any[]) : any {
    let validators = [];
    conditions.forEach(condition => {
      switch(condition.type) { 
        case 'required': { 
            validators.push(Validators.required);
            break; 
        } 
        case 'minLength': { 
          validators.push(Validators.minLength(condition.value));
            break; 
        }
        case 'email': {
          validators.push(CustomValidators.email)
          break;
        }
        case 'forbiddenName': {
          let regex = new RegExp(condition.value, "i");
          validators.push(forbiddenNameValidator(regex));
          break;
        }
        case 'equalTo': {
          

          break;
        }
        default: { 
            //statements; 
            break; 
        } 
      };

    });

    return validators;
  }
}