import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {Inject, Injectable, InjectionToken} from '@angular/core';

export enum StateMatcher {
  TOUCHED,
  DIRTY,
  SUBMITTED
}

export const ERROR_STATE_MATCHER_CONFIG = new InjectionToken<StateMatcher[]>('');

@Injectable()
export class ErrorStateMatcher {

  TOUCHED = false;
  DIRTY = false;
  SUBMITTED = true;

  constructor(@Inject(ERROR_STATE_MATCHER_CONFIG) stateMatcherConfig: StateMatcher[]) {
    if (stateMatcherConfig && stateMatcherConfig.length > 0) {
      this.TOUCHED = stateMatcherConfig.includes(StateMatcher.TOUCHED);
      this.DIRTY = stateMatcherConfig.includes(StateMatcher.DIRTY);
      this.SUBMITTED = stateMatcherConfig.includes(StateMatcher.SUBMITTED);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!form) {
      return false;
    }
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid &&
      ((control.touched && this.TOUCHED)
        || (control.dirty && this.DIRTY)
        || (isSubmitted && this.SUBMITTED)));
  }
}

