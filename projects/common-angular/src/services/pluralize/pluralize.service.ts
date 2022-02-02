import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluralizeService {

  constructor() {
  }

  plural(count: any, one: any, few: any, other: any): string {
    return PluralizeService.getPluralNoun(count, one, few, other);
  }

  pluralWithValue(count: any, one: any, few: any, other: any): string {
    return count + ' ' + this.plural(count, one, few, other);
  }

  private static getPluralNoun(num: number, ...forms: string[]) {
    let str;
    switch (forms.length) {
      case 1:
        throw new Error('Not enough forms');
      case 2:
        str = num > 1 ? forms[1] : forms[0];
        break;
      default:
        str = forms[PluralizeService.getNounPluralForm(num)];
        break;
    }
    return str.replace(/%d/g, (num).toString());
  }

  private static getNounPluralForm(a: number) {
    if (a % 10 === 1 && a % 100 !== 11) {
      return 0;
    } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
      return 1;
    } else {
      return 2;
    }
  }
}
