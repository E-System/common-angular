import {NgModule} from '@angular/core';
import {ClickOutsideDirective} from './directives/click-outside/click-outside.directive';
import {PluralizePipe} from './pipes/pluralize/pluralize.pipe';
import {EnvironmentPipe} from './pipes/environment/environment.pipe';
import {TimeFormatPipe} from './pipes/time-format/time-format.pipe';
import {VarDirective} from './directives/var/var.directive';
import { EntityPageComponent } from './components/entity-page/entity-page.component';
import { ColHeaderPipe } from './pipes/col-header/col-header.pipe';
import { EntityComponent } from './components/entity/entity.component';
import {ERROR_STATE_MATCHER_CONFIG, ErrorStateMatcher, StateMatcher} from './config/error-state-matcher';
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
    // EntityPageComponent,
    ColHeaderPipe,
    // EntityComponent
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
    VarDirective,
    // EntityPageComponent,
    ColHeaderPipe,
    // EntityComponent,
    ErrorStateMatcher
  ]
})
export class CommonAngularModule {
}
