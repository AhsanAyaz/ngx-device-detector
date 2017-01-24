import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from "@angular/common";
// import {DIRECTIVES} from './directives';
// import {PIPES} from './pipes';
import {PROVIDERS} from './src/services';

// export * from './directives';
export * from './src/services';
// export * from './pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})
export class Ng2DeviceDetector {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2DeviceDetector,
      providers: PROVIDERS
    };
  }
}