import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Pipe({
  name: 'fileStoreUrl'
})
export class FileStoreUrlPipe implements PipeTransform {

  transform(fileStoreId: number, params?: string): string | number {
    return `${environment.apiUrl}/files/${fileStoreId}${params ? '?' + params : ''}`;
  }
}
