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
  orientation: string;
}
export enum DeviceType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  Unknown = 'unknown',
}
export enum OrientationType {
  Portrait = 'portrait',
  Landscape = 'landscape',
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
  deviceType = '';
  orientation = '';
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
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.orientation = window.matchMedia('(orientation: landscape)').matches
        ? OrientationType.Landscape
        : OrientationType.Portrait;
    } else {
      this.orientation = Constants.GENERAL.UKNOWN;
    }

    this.deviceType = this.isTablet()
      ? DeviceType.Tablet
      : this.isMobile(this.userAgent)
        ? DeviceType.Mobile
        : this.isDesktop(this.userAgent)
          ? DeviceType.Desktop
          : DeviceType.Unknown;
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
      deviceType: this.deviceType,
      orientation: this.orientation,
    };
    return deviceInfo;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the mobile devices to check
   * if the current device is a mobile and also check current device is tablet so it will return false.
   * @returns whether the current device is a mobile
   */
  public isMobile(userAgent = this.userAgent): boolean {
    if (this.isTablet(userAgent)) {
      return false;
    }
    const match = Object.keys(Constants.MOBILES_RE).find(mobile => {
      return this.reTree.test(userAgent, Constants.MOBILES_RE[mobile]);
    });
    return !!match;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the tablet devices to check
   * if the current device is a tablet.
   * @returns whether the current device is a tablet
   */
  public isTablet(userAgent = this.userAgent): boolean {
    if (
      isPlatformBrowser(this.platformId) &&
      (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE[iPad]) ||
        (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
    ) {
      return true;
    }
    const match = Object.keys(Constants.TABLETS_RE).find(mobile => {
      return !!this.reTree.test(userAgent, Constants.TABLETS_RE[mobile]);
    });
    return !!match;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the current device info with the desktop devices to check
   * if the current device is a desktop device.
   * @returns whether the current device is a desktop device
   */
  public isDesktop(userAgent = this.userAgent): boolean {
    if (this.device === Constants.DEVICES.UNKNOWN) {
      if (this.isMobile(userAgent) || this.isTablet(userAgent)) {
        return false;
      }
    }
    return Constants.DESKTOP_DEVICES.indexOf(this.device) > -1;
  }
}
