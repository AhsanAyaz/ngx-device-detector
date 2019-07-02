import { NgModule, ModuleWithProviders } from '@angular/core';
import { DeviceDetectorService } from './ngx-device-detector.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    DeviceDetectorService
  ]
})
export class DeviceDetectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DeviceDetectorModule,
      providers: [DeviceDetectorService]
    };
  }
}
