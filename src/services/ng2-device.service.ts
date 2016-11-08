/**
 * Created by ahsanayaz on 08/11/2016.
 */

import {Injectable} from '@angular/core';
import * as Constants from '../constants/ng2-device.constants';
import {ReTree} from '../services/retree.service';
@Injectable()
export class Device{
    ua: any;
    userAgent: any;
    os : any;
    browser: any;
    device : any;
    os_version: any;
    browser_version:any;
    constructor() {
        let self = this;
        self.ua = window.navigator.userAgent;
        self._setDeviceInfo();
    }

    private _setDeviceInfo(){
        let self = this;
        let reTree = new ReTree();
        let ua = self.ua;
        self.userAgent = ua;
        self.os = Object.keys(Constants.OS).reduce(function (obj:any, item:any) {
            obj[Constants.OS[item]] = reTree.test(ua, Constants.OS_RE[item]);
            return obj;
        }, {});

        self.browser = Object.keys(Constants.BROWSERS).reduce(function (obj:any, item:any) {
            obj[Constants.BROWSERS[item]] = reTree.test(ua, Constants.BROWSERS_RE[item]);
            return obj;
        }, {});

        self.device = Object.keys(Constants.DEVICES).reduce(function (obj:any, item:any) {
            obj[Constants.DEVICES[item]] = reTree.test(ua, Constants.DEVICES_RE[item]);
            return obj;
        }, {});

        self.os_version = Object.keys(Constants.OS_VERSIONS).reduce(function (obj:any, item:any) {
            obj[Constants.OS_VERSIONS[item]] = reTree.test(ua, Constants.OS_VERSIONS_RE[item]);
            return obj;
        }, {});

        self.os = [
            Constants.OS.WINDOWS,
            Constants.OS.IOS,
            Constants.OS.MAC,
            Constants.OS.ANDROID,
            Constants.OS.LINUX,
            Constants.OS.UNIX,
            Constants.OS.FIREFOX_OS,
            Constants.OS.CHROME_OS,
            Constants.OS.WINDOWS_PHONE
        ].reduce(function (previousValue, currentValue) {
            return (previousValue === Constants.OS.UNKNOWN && self.os[currentValue]) ? currentValue : previousValue;
        }, Constants.OS.UNKNOWN);

        self.browser = [
            Constants.BROWSERS.CHROME,
            Constants.BROWSERS.FIREFOX,
            Constants.BROWSERS.SAFARI,
            Constants.BROWSERS.OPERA,
            Constants.BROWSERS.IE,
            Constants.BROWSERS.MS_EDGE,
            Constants.BROWSERS.FB_MESSANGER
        ].reduce(function (previousValue, currentValue) {
            return (previousValue === Constants.BROWSERS.UNKNOWN && self.browser[currentValue]) ? currentValue : previousValue;
        }, Constants.BROWSERS.UNKNOWN);

        self.device = [
            Constants.DEVICES.ANDROID,
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.IPHONE,
            Constants.DEVICES.I_POD,
            Constants.DEVICES.BLACKBERRY,
            Constants.DEVICES.FIREFOX_OS,
            Constants.DEVICES.CHROME_BOOK,
            Constants.DEVICES.WINDOWS_PHONE,
            Constants.DEVICES.PS4,
            Constants.DEVICES.CHROMECAST,
            Constants.DEVICES.APPLE_TV,
            Constants.DEVICES.GOOGLE_TV,
            Constants.DEVICES.VITA
        ].reduce(function (previousValue, currentValue) {
            return (previousValue === Constants.DEVICES.UNKNOWN && self.device[currentValue]) ? currentValue : previousValue;
        }, Constants.DEVICES.UNKNOWN);

        self.os_version = [
            Constants.OS_VERSIONS.WINDOWS_3_11,
            Constants.OS_VERSIONS.WINDOWS_95,
            Constants.OS_VERSIONS.WINDOWS_ME,
            Constants.OS_VERSIONS.WINDOWS_98,
            Constants.OS_VERSIONS.WINDOWS_CE,
            Constants.OS_VERSIONS.WINDOWS_2000,
            Constants.OS_VERSIONS.WINDOWS_XP,
            Constants.OS_VERSIONS.WINDOWS_SERVER_2003,
            Constants.OS_VERSIONS.WINDOWS_VISTA,
            Constants.OS_VERSIONS.WINDOWS_7,
            Constants.OS_VERSIONS.WINDOWS_8_1,
            Constants.OS_VERSIONS.WINDOWS_8,
            Constants.OS_VERSIONS.WINDOWS_10,
            Constants.OS_VERSIONS.WINDOWS_PHONE_7_5,
            Constants.OS_VERSIONS.WINDOWS_PHONE_8_1,
            Constants.OS_VERSIONS.WINDOWS_PHONE_10,
            Constants.OS_VERSIONS.WINDOWS_NT_4_0,
            Constants.OS_VERSIONS.MACOSX,
            Constants.OS_VERSIONS.MACOSX_3,
            Constants.OS_VERSIONS.MACOSX_4,
            Constants.OS_VERSIONS.MACOSX_5,
            Constants.OS_VERSIONS.MACOSX_6,
            Constants.OS_VERSIONS.MACOSX_7,
            Constants.OS_VERSIONS.MACOSX_8,
            Constants.OS_VERSIONS.MACOSX_9,
            Constants.OS_VERSIONS.MACOSX_10,
            Constants.OS_VERSIONS.MACOSX_11,
            Constants.OS_VERSIONS.MACOSX_12,
            Constants.OS_VERSIONS.MACOSX_13,
            Constants.OS_VERSIONS.MACOSX_14,
            Constants.OS_VERSIONS.MACOSX_15
        ].reduce(function (previousValue, currentValue) {
            return (previousValue === Constants.OS_VERSIONS.UNKNOWN && self.os_version[currentValue]) ? currentValue : previousValue;
        }, Constants.OS_VERSIONS.UNKNOWN);

        self.browser_version = "0";
        if (self.browser !== Constants.BROWSERS.UNKNOWN) {
            var re = Constants.BROWSER_VERSIONS_RE[self.browser];
            var res = reTree.exec(ua, re);
            if (!!res) {
                self.browser_version = res[1];
            }
        }
    }

    public getDeviceInfo(): any{
        let self = this;
        return {
            userAgent: self.userAgent,
            os : self.os,
            browser: self.browser,
            device : self.device,
            os_version: self.os_version,
            browser_version:self.browser_version,
        };
    }
    public isMobile() {
        let self = this;
        return [
            Constants.DEVICES.ANDROID,
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.IPHONE,
            Constants.DEVICES.I_POD,
            Constants.DEVICES.BLACKBERRY,
            Constants.DEVICES.FIREFOX_OS,
            Constants.DEVICES.WINDOWS_PHONE,
            Constants.DEVICES.VITA
        ].some(function (item) {
            return self.device == item;
        });
    };

    public isTablet() {
        let self = this;
        return [
            Constants.DEVICES.I_PAD,
            Constants.DEVICES.FIREFOX_OS
        ].some(function (item) {
            return self.device == item;
        });
    };

    public isDesktop() {
        let self = this;
        return [
            Constants.DEVICES.PS4,
            Constants.DEVICES.CHROME_BOOK,
            Constants.DEVICES.UNKNOWN
        ].some(function (item) {
            return self.device == item;
        });
    };
}
