import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2DeviceService } from './ng2-device.service';
import { ReTree } from './retree.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  exports: [
  ]
})
export class Ng2DeviceDetectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2DeviceDetectorModule,
      providers: [
        ReTree,
        Ng2DeviceService
      ]
    };
  }
}


export { Ng2DeviceService } from './ng2-device.service';
export { ReTree } from './retree.service';
