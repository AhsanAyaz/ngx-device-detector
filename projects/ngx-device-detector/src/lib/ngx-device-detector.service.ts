import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Constants from './device-detector.constants';
import { ReTree } from './retree';
import { DeviceInfo } from './device-info.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  ua = '';
  userAgent = '';
  os = '';
  browser = '';
  device = '';
  osVersion = '';
  browserVersion = '';

  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(this.platformId)) {
      this.ua = window.navigator.userAgent;
    }
    this._setDeviceInfo();
  }

  /**
   * @author Ahsan Ayaz
   * @desc Sets the initial value of the device when the service is initiated.
   * This value is later accessible for usage
   */
  private _setDeviceInfo() {
    const reTree = new ReTree();
    const ua = this.ua;
    this.userAgent = ua;
    const mappings = [
      { const: 'OS', prop: 'os' },
      { const: 'BROWSERS', prop: 'browser' },
      { const: 'DEVICES', prop: 'device' },
      { const: 'OS_VERSIONS', prop: 'os_version' },
    ];

    mappings.forEach((mapping) => {
      this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce((obj: any, item: any) => {
        obj[Constants[mapping.const][item]] = reTree.test(ua, Constants[`${mapping.const}_RE`][item]);
        return obj;
      }, {});
    });

    mappings.forEach((mapping) => {
      this[mapping.prop] = Object.keys(Constants[mapping.const])
        .map((key) => {
          return Constants[mapping.const][key];
        }).reduce((previousValue, currentValue) => {
          return (previousValue === Constants[mapping.const].UNKNOWN && this[mapping.prop][currentValue])
            ? currentValue : previousValue;
        }, Constants[mapping.const].UNKNOWN);
    });

    this.browserVersion = '0';
    if (this.browser !== Constants.BROWSERS.UNKNOWN) {
      const re = Constants.BROWSER_VERSIONS_RE[this.browser];
      const res = reTree.exec(ua, re);
      if (!!res) {
        this.browserVersion = res[1];
      }
    }
  }

  /**
   * @author Ahsan Ayaz
   * @desc Returns the device information
   * @returns the device information object.
   */
  public getDeviceInfo(): DeviceInfo {
    const deviceInfo: DeviceInfo = {
      userAgent: this.userAgent,
      os: this.os,
      browser: this.browser,
      device: this.device,
      os_version: this.osVersion,
      browser_version: this.browserVersion
    };
    return deviceInfo;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the mobile devices to check
   * if the current device is a mobile and also check current device is tablet so it will return false.
   * @returns whether the current device is a mobile
   */
  public isMobile(): boolean {
    if (this.isTablet()) {
      return false;
    }
    const mobiles = Constants.MOBILES;
    let isMob = false;
    for (const key in mobiles) {
      if (mobiles.hasOwnProperty(key)) {
        const pattern = new RegExp(mobiles[key]);
        if (pattern.test(this.userAgent)) {
          isMob = true;
          break;
        }
      }
    }
    return isMob;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the tablet devices to check
   * if the current device is a tablet.
   * @returns whether the current device is a tablet
   */
  public isTablet() {
    const tablets = Constants.TABLETS;
    let isTab = false;
    for (const key in tablets) {
      if (tablets.hasOwnProperty(key)) {
        const pattern = new RegExp(tablets[key]);
        if (pattern.test(this.userAgent)) {
          isTab = true;
          break;
        }
      }
    }
    return isTab;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the desktop devices to check
   * if the current device is a desktop device.
   * @returns whether the current device is a desktop device
   */
  public isDesktop() {
    const desktopDevices = [
      Constants.DEVICES.PS4,
      Constants.DEVICES.CHROME_BOOK,
      Constants.DEVICES.UNKNOWN
    ];
    if (this.device === Constants.DEVICES.UNKNOWN) {
      if (this.isMobile() || this.isTablet()) {
        return false;
      }
    }
    return desktopDevices.indexOf(this.device) > -1;
  }
}
