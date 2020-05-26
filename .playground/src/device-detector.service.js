"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by ahsanayaz on 08/11/2016.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Constants = require("./device-detector.constants");
var retree_1 = require("./retree");
var DeviceDetectorService = /** @class */ (function () {
    function DeviceDetectorService(platformId) {
        this.platformId = platformId;
        this.ua = '';
        this.userAgent = '';
        this.os = '';
        this.browser = '';
        this.device = '';
        this.os_version = '';
        this.browser_version = '';
        this.reTree = new retree_1.ReTree();
        if (common_1.isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
            this.userAgent = window.navigator.userAgent;
        }
        this.setDeviceInfo(this.userAgent);
    }
    /**
     * @author Ahsan Ayaz
     * @desc Sets the initial value of the device when the service is initiated.
     * This value is later accessible for usage
     */
    DeviceDetectorService.prototype.setDeviceInfo = function (ua) {
        var _this = this;
        if (ua === void 0) { ua = this.userAgent; }
        if (ua !== this.userAgent) {
            this.userAgent = ua;
        }
        var mappings = [
            { const: 'OS', prop: 'os' },
            { const: 'BROWSERS', prop: 'browser' },
            { const: 'DEVICES', prop: 'device' },
            { const: 'OS_VERSIONS', prop: 'os_version' },
        ];
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce(function (obj, item) {
                if (Constants[mapping.const][item] === 'device') {
                    // hack for iOS 13 Tablet
                    if (common_1.isPlatformBrowser(_this.platformId) &&
                        (!!_this.reTree.test(_this.userAgent, Constants.TABLETS_RE['iPad']) ||
                            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
                        obj[Constants[mapping.const][item]] = 'iPad';
                        return Object;
                    }
                }
                obj[Constants[mapping.const][item]] = _this.reTree.test(ua, Constants[mapping.const + "_RE"][item]);
                return obj;
            }, {});
        });
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const])
                .map(function (key) {
                return Constants[mapping.const][key];
            })
                .reduce(function (previousValue, currentValue) {
                if (mapping.prop === 'device' && previousValue === Constants[mapping.const].ANDROID) {
                    // if we have the actual device found, instead of 'Android', return the actual device
                    return _this[mapping.prop][currentValue] ? currentValue : previousValue;
                }
                else {
                    return previousValue === Constants[mapping.const].UNKNOWN && _this[mapping.prop][currentValue]
                        ? currentValue
                        : previousValue;
                }
            }, Constants[mapping.const].UNKNOWN);
        });
        this.browser_version = '0';
        if (this.browser !== Constants.BROWSERS.UNKNOWN) {
            var re = Constants.BROWSER_VERSIONS_RE[this.browser];
            var res = this.reTree.exec(ua, re);
            if (!!res) {
                this.browser_version = res[1];
            }
        }
    };
    /**
     * @author Ahsan Ayaz
     * @desc Returns the device information
     * @returns the device information object.
     */
    DeviceDetectorService.prototype.getDeviceInfo = function () {
        var deviceInfo = {
            userAgent: this.userAgent,
            os: this.os,
            browser: this.browser,
            device: this.device,
            os_version: this.os_version,
            browser_version: this.browser_version,
        };
        return deviceInfo;
    };
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the mobile devices to check
     * if the current device is a mobile and also check current device is tablet so it will return false.
     * @returns whether the current device is a mobile
     */
    DeviceDetectorService.prototype.isMobile = function (userAgent) {
        var _this = this;
        if (userAgent === void 0) { userAgent = this.userAgent; }
        if (this.isTablet(userAgent)) {
            return false;
        }
        var match = Object.keys(Constants.MOBILES_RE).find(function (mobile) {
            return _this.reTree.test(userAgent, Constants.MOBILES_RE[mobile]);
        });
        return !!match;
    };
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the tablet devices to check
     * if the current device is a tablet.
     * @returns whether the current device is a tablet
     */
    DeviceDetectorService.prototype.isTablet = function (userAgent) {
        var _this = this;
        if (userAgent === void 0) { userAgent = this.userAgent; }
        if (common_1.isPlatformBrowser(this.platformId) &&
            (!!this.reTree.test(this.userAgent, Constants.TABLETS_RE['iPad']) ||
                (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
            return true;
        }
        var match = Object.keys(Constants.TABLETS_RE).find(function (mobile) {
            return !!_this.reTree.test(userAgent, Constants.TABLETS_RE[mobile]);
        });
        return !!match;
    };
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the desktop devices to check
     * if the current device is a desktop device.
     * @returns whether the current device is a desktop device
     */
    DeviceDetectorService.prototype.isDesktop = function (userAgent) {
        if (userAgent === void 0) { userAgent = this.userAgent; }
        var desktopDevices = [Constants.DEVICES.PS4, Constants.DEVICES.CHROME_BOOK, Constants.DEVICES.UNKNOWN];
        if (this.device === Constants.DEVICES.UNKNOWN) {
            if (this.isMobile(userAgent) || this.isTablet(userAgent)) {
                return false;
            }
        }
        return desktopDevices.indexOf(this.device) > -1;
    };
    DeviceDetectorService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [Object])
    ], DeviceDetectorService);
    return DeviceDetectorService;
}());
exports.DeviceDetectorService = DeviceDetectorService;
//# sourceMappingURL=device-detector.service.js.map