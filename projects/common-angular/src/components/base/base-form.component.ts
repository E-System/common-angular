import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

export abstract class BaseFormComponent {

  isLoading = false;
  form: FormGroup = this.buildForm();

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
