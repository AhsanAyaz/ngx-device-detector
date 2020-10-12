// tslint:disable: variable-name
/**
 * Created by ahsanayaz on 08/11/2016.
 */
import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Constants from './device-detector.constants';
import { ReTree } from './retree';

export interface DeviceInfo {
  userAgent: string;
  os: string;
  browser: string;
  device: string;
  os_version: string;
  browser_version: string;
  deviceType: string;
}

const iPad = 'iPad';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  ua = '';
  userAgent = '';
  os = '';
  browser = '';
  device = '';
  os_version = '';
  browser_version = '';
  reTree = new ReTree();
  storeDesktop: boolean = null;
  storeMobile: boolean = null;
  storeTablet: boolean = null;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.userAgent = window.navigator.userAgent;
    }
    this.setDeviceInfo(this.userAgent);
  }

  /**
   * @author Ahsan Ayaz
   * @desc Sets the initial value of the device when the service is initiated.
   * This value is later accessible for usage
   */
  setDeviceInfo(ua = this.userAgent): void {
    if (ua !== this.userAgent) {
      this.userAgent = ua;
    }
    const mappings = [
      { const: 'OS', prop: 'os' },
      { const: 'BROWSERS', prop: 'browser' },
      { const: 'DEVICES', prop: 'device' },
      { const: 'OS_VERSIONS', prop: 'os_version' },
    ];

    mappings.forEach(mapping => {
      this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce((obj: any, item: any) => {
        if (Constants[mapping.const][item] === 'device') {
          // hack for iOS 13 Tablet
          if (
            isPlatformBrowser(this.platformId) &&
            (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE[iPad]) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
          ) {
            obj[Constants[mapping.const][item]] = iPad;
            return Object;
          }
        }
        obj[Constants[mapping.const][item]] = this.reTree.test(ua, Constants[`${mapping.const}_RE`][item]);
        return obj;
      }, {});
    });

    mappings.forEach(mapping => {
      this[mapping.prop] = Object.keys(Constants[mapping.const])
        .map(key => {
          return Constants[mapping.const][key];
        })
        .reduce((previousValue, currentValue) => {
          if (mapping.prop === 'device' && previousValue === Constants[mapping.const].ANDROID) {
            // if we have the actual device found, instead of 'Android', return the actual device
            return this[mapping.prop][currentValue] ? currentValue : previousValue;
          } else {
            return previousValue === Constants[mapping.const].UNKNOWN && this[mapping.prop][currentValue]
              ? currentValue
              : previousValue;
          }
        }, Constants[mapping.const].UNKNOWN);
    });

    this.browser_version = '0';
    if (this.browser !== Constants.BROWSERS.UNKNOWN) {
      const re = Constants.BROWSER_VERSIONS_RE[this.browser];
      const res = this.reTree.exec(ua, re);
      if (!!res) {
        this.browser_version = res[1];
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
      os_version: this.os_version,
      browser_version: this.browser_version,
      deviceType: this.isTablet() ? 'tablet' : (this.isMobile(this.userAgent, false) ? 'mobile' : (this.isDesktop(this.userAgent, false) ? 'desktop' : 'unknown'))
    };
    return deviceInfo;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the mobile devices to check
   * if the current device is a mobile and also check current device is tablet so it will return false.
   * @returns whether the current device is a mobile
   */
  public isMobile(userAgent = this.userAgent, checkOtherDevice = true): boolean {
    if (this.storeMobile !== null && userAgent === this.userAgent) { // return when we already have mobile value
      return this.storeMobile;
    }
    if (checkOtherDevice && this.isTablet(userAgent)) { // checkOtherDevice = false: no need to check isTablet because we already checked in getDeviceInfo
      this.storeMobile = false;
      return this.storeMobile;
    }
    const match = Object.keys(Constants.MOBILES_RE).find(mobile => {
      return this.reTree.test(userAgent, Constants.MOBILES_RE[mobile]);
    });
    this.storeMobile = !!match;
    return this.storeMobile;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the tablet devices to check
   * if the current device is a tablet.
   * @returns whether the current device is a tablet
   */
  public isTablet(userAgent = this.userAgent): boolean {
    if (this.storeTablet !== null && userAgent === this.userAgent) { // return when we already have tablet value
      return this.storeTablet;
    }
    if (
      isPlatformBrowser(this.platformId) &&
      (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE[iPad]) ||
        (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
    ) {
      this.storeTablet = true;
      return this.storeTablet;
    }
    const match = Object.keys(Constants.TABLETS_RE).find(mobile => {
      return !!this.reTree.test(userAgent, Constants.TABLETS_RE[mobile]);
    });
    this.storeTablet = !!match;
    return this.storeTablet;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the desktop devices to check
   * if the current device is a desktop device.
   * @returns whether the current device is a desktop device
   */
  public isDesktop(userAgent = this.userAgent, checkOtherDevices = true): boolean {
    if (this.storeDesktop !== null && userAgent === this.userAgent) { // return when we already have desktop value
      return this.storeDesktop;
    }
    const desktopDevices = [Constants.DEVICES.PS4, Constants.DEVICES.CHROME_BOOK, Constants.DEVICES.UNKNOWN];
    if (checkOtherDevices && this.device === Constants.DEVICES.UNKNOWN) { // checkOtherDevices = false: no need to check isMobile & isTablet because we already checked in getDeviceInfo
      if (this.isMobile(userAgent) || this.isTablet(userAgent)) {
        this.storeDesktop = false;
        return this.storeDesktop;
      }
    }
    this.storeDesktop = desktopDevices.indexOf(this.device) > -1;
    return this.storeDesktop;
  }
}
