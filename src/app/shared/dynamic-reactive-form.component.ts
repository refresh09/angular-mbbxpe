import {  Component, EventEmitter, Input,
          OnChanges, OnInit, Output }                 from "@angular/core";
import {
  FormGroup, FormBuilder, Validators, FormControl }   from "@angular/forms";


  @Component({
    exportAs: "dynamicForm",
    selector: "dynamic-reactive-form",
    template: 
    `
      <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
        <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
        </ng-container>
      </form>
    `
  })
  export class DynamicReactiveForm {

  }