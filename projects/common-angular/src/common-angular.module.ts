import {NgModule} from '@angular/core';
import {ClickOutsideDirective} from './directives/click-outside/click-outside.directive';
import {PluralizePipe} from './pipes/pluralize/pluralize.pipe';
import {EnvironmentPipe} from './pipes/environment/environment.pipe';
import {TimeFormatPipe} from './pipes/time-format/time-format.pipe';
import {VarDirective} from './directives/var/var.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    PluralizePipe,
    EnvironmentPipe,
    TimeFormatPipe,
    VarDirective
  ],
  imports: [],
  exports: [
    ClickOutsideDirective,
    PluralizePipe,
    EnvironmentPipe,
    TimeFormatPipe,
    VarDirective
  ]
})
export class CommonAngularModule {
}
