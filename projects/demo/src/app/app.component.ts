import { Component, VERSION } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  propsToShow = ['userAgent', 'os', 'browser', 'device', 'os_version', 'browser_version', 'deviceType', 'orientation'];
  deviceInfo = null;
  version = VERSION.full;
  userAgentInputVal = null;
  ua;
  constructor(private deviceService: DeviceDetectorService) {
    try {
      this.ua = window.navigator.userAgent;
    } catch {
      console.log('UA not available');
    }
    this.applyDevice();
  }

  getDeviceInfo(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  get isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  get isTablet(): boolean {
    return this.deviceService.isTablet();
  }

  get isDesktop(): boolean {
    return this.deviceService.isDesktop();
  }

  applyDevice(userAgent = this.ua): void {
    this.deviceService.setDeviceInfo(userAgent);
    this.getDeviceInfo();
  }

  resetDeviceInfo(): void {
    this.applyDevice();
  }
}
