import {Inject, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileStoreUrl'
})
export class FileStoreUrlPipe implements PipeTransform {

  public constructor(@Inject('environment') private environment: any) {
  }

  transform(fileStoreId: number, params?: string): string | number {
    return `${this.environment.apiUrl}/files/${fileStoreId}${params ? '?' + params : ''}`;
  }
}
