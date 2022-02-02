import {Inject, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'environment'
})
export class EnvironmentPipe implements PipeTransform {

  constructor(@Inject('environment') private environment: any) {
  }

  transform(value: string, ...args: unknown[]): any {
    const values = value.split('.');
    if (values.length > 1) {
      let result = '';
      values.forEach(v => {
        result += this.environment[v];
      });
    } else {
      return this.environment[value];
    }
  }
}
