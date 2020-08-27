import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from './device-detector.service';

@NgModule({
  imports: [CommonModule],
})
export class DeviceDetectorModule {
  static forRoot(): ModuleWithProviders<DeviceDetectorModule> {
    return {
      ngModule: DeviceDetectorModule,
      providers: [DeviceDetectorService],
    };
  }
}
