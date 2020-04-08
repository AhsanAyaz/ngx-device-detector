import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from './device-detector.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class DeviceDetectorModule {
  static forRoot(): ModuleWithProviders<DeviceDetectorModule> {
    return {
      ngModule: DeviceDetectorModule,
      providers: [DeviceDetectorService]
    };
  }
}

export { DeviceDetectorService, DeviceInfo } from './device-detector.service';
export { ReTree } from './retree';
export * from './device-detector.constants';

