import { Component, VERSION } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  propsToShow = ['userAgent', 'os', 'browser', 'device', 'os_version', 'browser_version'];
  deviceInfo = null;
  version = VERSION.full;
  userAgentInputVal = null;
  constructor(private deviceService: DeviceDetectorService) {
    this.applyDevice();
  }

  getDeviceInfo() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  get isTablet() {
    return this.deviceService.isTablet();
  }

  get isDesktop() {
    return this.deviceService.isDesktop();
  }

  applyDevice(userAgent = window.navigator.userAgent) {
    this.deviceService.setDeviceInfo(userAgent);
    this.getDeviceInfo();
  }

  resetDeviceInfo() {
    this.applyDevice();
  }
}
