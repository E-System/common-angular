import {Injectable} from '@angular/core';

const windowNavigator = (window.navigator as any);

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  downloadFile(fileUrl: string, fileName?: string) {
    let downloadFileName = 'file';
    if (fileName) {
      downloadFileName = fileName;
    }
    const req = new XMLHttpRequest();
    req.open('GET', fileUrl, true);
    req.responseType = 'blob';
    req.onload = (event) => {
      const blob = req.response;
      let contentType = '';
      const contentTypeHeader = req.getResponseHeader('content-type');
      if (contentTypeHeader) {
        contentType = contentTypeHeader;
      }
      if (windowNavigator) {
        windowNavigator(new Blob([blob], {type: contentType}), fileName);
      } else {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.download = downloadFileName;
        link.href = window.URL.createObjectURL(blob);
        link.click();
        document.body.removeChild(link);
      }
    };
    req.send();
  }

  downloadBlobFile(blob: Blob, fileName: string) {
    if (windowNavigator) {
      windowNavigator(new Blob([blob], {type: blob.type.toString()}), fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = fileName;
      anchor.href = url;
      anchor.click();
    }
  }

  openBlobFile(blob: Blob, target?: string) {
    if (windowNavigator) {
      windowNavigator(new Blob([blob], {type: blob.type.toString()}));
    } else {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      if (target) {
        anchor.target = target;
      }
      anchor.href = url;
      anchor.click();
    }
  }
}
