import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const strHours = hours ? hours + ' ч ' : '';
    const strMinutes = minutes ? minutes + ' мин' : '';
    return strHours + strMinutes;
  }
}
