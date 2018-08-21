import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerDirective } from './directives/datepicker.directive';

@NgModule({
  declarations: [
    DatepickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatepickerDirective
  ]
})

export class ZrDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZrDatepickerModule
    };
  }
}
