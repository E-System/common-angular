import { Pipe, PipeTransform } from '@angular/core';
import {PluralizeService} from '../../services/pluralize/pluralize.service';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  constructor(private pluralizeService: PluralizeService) {}

  transform(value: number, one: string, few: string, other: string, skipZero?: boolean, hideValue?: boolean): string {
    if (skipZero && !value) {
      return '';
    }
    let result = '';
    if (!hideValue) {
      result += (value + ' ');
    }
    return result + this.pluralizeService.plural(value, one, few, other);
  }
}
