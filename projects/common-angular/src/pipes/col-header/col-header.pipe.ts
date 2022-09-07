import {Pipe, PipeTransform} from '@angular/core';
import {TableColumn} from '../../models/table-column';

@Pipe({
  name: 'colHeader'
})
export class ColHeaderPipe implements PipeTransform {

  transform(cols: TableColumn[], field: string): string {
    return cols.find(v => v.field === field)?.header || field;
  }
}
