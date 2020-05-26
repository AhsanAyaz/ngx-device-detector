/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Pipe, PipeTransform } from '@angular/core';

import { DeviceDetectorModule, DeviceDetectorService, DeviceInfo }  from '../src/index';


@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, props: string[] = []) : any {
    let keys = [];
    let noFilter = props.length === 0;
    for (let key in value) {
      if(noFilter){
        if(value.hasOwnProperty(key)){
          keys.push({key: key, value: value[key]});
        }
      }
      else{
        if(props.indexOf(key) !== -1){
          keys.push({key: key, value: value[key]});
        }
      }
    }
    return keys;
  }
}


@Component({
  selector: 'app',
  template: `
  <div id="demoApp" class="container">
    <div class="demo-container">
      <div class="demo-heading">
        <h2 class="text-center demo-heading-text">
          ngx-device-detector demo
        </h2>
        <p class="text-center">
          Open this page from different devices to see the appropriate details
        </p>
        <h4 class="text-center">Device Information</h4>
      </div>
      <div class="information-table">
        <table class="table table-hover">
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
          <tr *ngFor="let info of device | keys: propsToShow" class="info-item w3-hover-blue">
            <td>{{info.key}}</td>
            <td>{{info.value}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`
})
class AppComponent {
  propsToShow = ["userAgent", "os", "browser", "device", "os_version", "browser_version"];
  device: DeviceInfo = null;
  constructor(private deviceService: DeviceDetectorService){
    this.device = deviceService.getDeviceInfo();
    console.log(this.device);
    console.log('isMobile', this.deviceService.isMobile());
    console.log('isTablet', this.deviceService.isTablet());
  }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, KeysPipe ],
  imports: [ BrowserModule, DeviceDetectorModule.forRoot() ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
