import {NgModule} from '@angular/core';
import {ClickOutsideDirective} from './directives/click-outside/click-outside.directive';
import {PluralizePipe} from './pipes/pluralize/pluralize.pipe';
import {EnvironmentPipe} from './pipes/environment/environment.pipe';
import {TimeFormatPipe} from './pipes/time-format/time-format.pipe';
import {VarDirective} from './directives/var/var.directive';
import {ColHeaderPipe} from './pipes/col-header/col-header.pipe';
import {FileStoreUrlPipe} from './pipes/file-store-url/file-store-url.pipe';
import {DownloadFileDirective} from './directives/download-file/download-file.directive';
import {DragAndDropDirective} from './directives/drag-and-drop/drag-and-drop.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    DownloadFileDirective,
    DragAndDropDirective,
    ColHeaderPipe,
    FileStoreUrlPipe,
    PluralizePipe,
    EnvironmentPipe,
    TimeFormatPipe,
    VarDirective,
  ],
  imports: [],
  exports: [
    ClickOutsideDirective,
    DownloadFileDirective,
    DragAndDropDirective,
    ColHeaderPipe,
    FileStoreUrlPipe,
    PluralizePipe,
    EnvironmentPipe,
    TimeFormatPipe,
    VarDirective
  ]
})
export class CommonAngularModule {
}
