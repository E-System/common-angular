import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Directive, OnInit} from '@angular/core';

@Directive()
export abstract class BaseFormHandler implements OnInit {

  isLoading = false;
  form: FormGroup;

  ngOnInit() {
    this.form = this.buildForm();
  }

  request(observable: Observable<any>,
          next: ((value: any) => void),
          error?: ((error: any) => void) | null,
          complete?: (() => void) | null) {
    if (this.form && this.form.valid && !this.isLoading) {
      this.isLoading = true;
      this.form.disable();
      observable.subscribe({
        next: (valueData: any) => {
          next(valueData);
          this.form.enable();
          this.isLoading = false;
          if (complete) {
            complete();
          }
        },
        error: (errorData) => {
          if (error) {
            error(errorData);
            this.form.enable();
            this.isLoading = false;
            if (complete) {
              complete();
            }
          }
        }
      });
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
    }
  }

  abstract buildForm(): FormGroup;

  abstract onSubmit(): void;
}
