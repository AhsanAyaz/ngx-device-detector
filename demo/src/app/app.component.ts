import { Component } from '@angular/core';
import { Ng2DeviceService } from 'ng2-device-detector';
@Component({
  selector: 'ng2-dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  propsToShow = ["userAgent", "os", "browser", "device", "os_version", "browser_version"];
  device = null;
  constructor(private deviceService: Ng2DeviceService){
    this.device = deviceService.getDeviceInfo();
    console.log(this.device);
  }
}
