import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileService} from '../../services/file/file.service';

@Directive({
  selector: '[downloadFile]'
})
export class DownloadFileDirective {

  private downloadUrl: string;

  @Input() fileName: string;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();

  @Input('downloadFile')
  public set url(url: string) {
    this.downloadUrl = url;
  }

  constructor(private readonly http: HttpClient,
              private readonly fileService: FileService) {
  }



  @HostListener('click')
  onClick() {
    this.http.get(this.downloadUrl, {responseType: 'blob'})
      .subscribe({
          next: (response: any) => {
            if (!this.fileName) {
              this.fileName = this.getFilenameFromHeaders(response.headers) || 'File';
            }
            this.fileService.downloadBlobFile(response, this.fileName);
            this.onSuccess.emit();
          },
          error: (error: any) => {
            this.onError.emit();
          }
        }
      );
  }

  private getFilenameFromHeaders(headers: HttpHeaders) {
    const contentDisposition = headers.get('Content-Disposition');
    if (!contentDisposition) {
      return null;
    }

    const leadIn = 'filename=';
    const start = contentDisposition.search(leadIn);
    if (start < 0) {
      return null;
    }

    const value = contentDisposition.substring(start + leadIn.length).trim();
    if (value.length === 0) {
      return null;
    }

    const firstCharacter = value[0];
    if (firstCharacter !== '\"' && firstCharacter !== '\'') {
      return value;
    }

    if (value.length < 2) {
      return null;
    }

    const lastCharacter = value[value.length - 1];
    if (lastCharacter !== firstCharacter) {
      return null;
    }

    return value.substring(1, value.length - 1);
  }
}
