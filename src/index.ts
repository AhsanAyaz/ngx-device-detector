import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from './device-detector.service';
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
export class DeviceDetectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DeviceDetectorModule,
      providers: [
        ReTree,
        DeviceDetectorService
      ]
    };
  }
}


export { DeviceDetectorService, DeviceInfo } from './device-detector.service';
export { ReTree } from './retree.service';
export * from './device-detector.constants';

