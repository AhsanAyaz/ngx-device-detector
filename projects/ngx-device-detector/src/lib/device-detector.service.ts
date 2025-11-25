/**
 * Created by ahsanayaz on 08/11/2016.
 */
import { computed, inject, Injectable, PLATFORM_ID, Signal, signal } from '@angular/core';
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
    isDesktopMode: boolean;
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
    Unknown = 'Unknown'
}

const iPad = 'iPad';

@Injectable({
    providedIn: 'root',
})
export class DeviceDetectorService {

    public readonly deviceInfo: Signal<DeviceInfo>;

    private readonly _ua = signal('');
    private readonly _userAgent = signal('');
    private readonly _os = signal('');
    private readonly _browser = signal('');
    private readonly _device = signal('');
    private readonly _os_version = signal('');
    private readonly _browser_version = signal('');
    private readonly _deviceType = signal<DeviceType>(DeviceType.Unknown);
    private readonly _orientation = signal<OrientationType | undefined>(undefined);
    private readonly _isDesktopMode = signal(false);

    private readonly reTree = signal(new ReTree());
    private readonly platformId = inject(PLATFORM_ID);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._userAgent.set(globalThis.navigator.userAgent);
        }

        this.setDeviceInfo(this._userAgent());
        this.deviceInfo = computed(() => {
            return {
                userAgent: this._userAgent(),
                os: this._os(),
                browser: this._browser(),
                device: this._device(),
                os_version: this._os_version(),
                browser_version: this._browser_version(),
                deviceType: this._deviceType(),
                orientation: this._orientation(),
                isDesktopMode: this._isDesktopMode(),
            } satisfies DeviceInfo;
        });
    }

    public get ua(): Signal<string> {
        return this._ua;
    }

    public get browser(): Signal<string> {
        return this._browser;
    }

    public get device(): Signal<string> {
        return this._device;
    }

    public get userAgent(): Signal<string> {
        return this._userAgent;
    }

    public get os(): Signal<string> {
        return this._os;
    }

    public get os_version(): Signal<string> {
        return this._os_version;
    }

    public get browser_version(): Signal<string> {
        return this._browser_version;
    }

    public get deviceType(): Signal<DeviceType> {
        return this._deviceType;
    }

    public get orientation(): Signal<OrientationType> {
        return this._orientation;
    }

    public get isDesktopMode(): Signal<boolean> {
        return this._isDesktopMode;
    }

    /**
     * @author Ahsan Ayaz
     * @desc Sets the initial value of the device when the service is initiated.
     * This value is later accessible for usage
     */
    private detectFromMapping(ua: string, mapping: { const: string; prop: string }): string {
        const constants = Constants[mapping.const];
        const regexMap = Constants[`${mapping.const}_RE`];

        // Special case for iOS 13 Tablet hack
        if (
            constants.device &&
            constants.device === 'device' &&
            isPlatformBrowser(this.platformId) &&
            (!!this.reTree().test(this._userAgent(), Constants.TABLETS_RE[iPad]) ||
                (typeof navigator !== 'undefined' &&
                    navigator.platform &&
                    navigator.platform.includes('Mac') &&
                    navigator.maxTouchPoints > 1))
        ) {
            return iPad;
        }

        // Find first match - early exit optimization
        for (const key of Object.keys(constants)) {
            const regexPattern = regexMap[key];
            if (regexPattern && this.reTree().test(ua, regexPattern)) {
                return constants[key];
            }
        }

        return constants.UNKNOWN || Constants.GENERAL.UKNOWN;
    }

    /**
     * Detects if a mobile device is running in desktop mode
     * Desktop mode occurs when mobile browsers request desktop websites
     * by sending desktop user agent strings while retaining mobile characteristics
     */
    private detectDesktopMode(ua: string): boolean {
        if (!isPlatformBrowser(this.platformId) || !globalThis) {
            return false;
        }

        // If user agent already indicates mobile/tablet, it's not desktop mode
        if (this._deviceType() === DeviceType.Mobile || this.deviceType() === DeviceType.Tablet) {
            return false;
        }

        // If it's genuinely desktop, it's not desktop mode
        if (this._deviceType() === DeviceType.Desktop) {
            return false;
        }

        // Desktop mode detection indicators
        const indicators = {
            // Touch support despite desktop UA
            hasTouch: 'ontouchstart' in globalThis || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0),

            // Mobile-like screen dimensions (rough heuristics)
            hasMobileScreenSize: this.hasMobileScreenDimensions(),

            // Mobile browser signatures in desktop mode
            hasMobileBrowserSignatures: this.hasMobileBrowserSignatures(ua),

            // Orientation support (more common on mobile)
            hasOrientationSupport: 'orientation' in globalThis || 'onorientationchange' in globalThis,

            // Device motion/orientation APIs (mobile-specific)
            hasDeviceMotion: 'DeviceMotionEvent' in globalThis || 'DeviceOrientationEvent' in globalThis,
        };

        // If device has touch + desktop UA, it's likely desktop mode
        if (indicators.hasTouch) {
            return true;
        }

        // If multiple mobile indicators are present with desktop UA, likely desktop mode
        const mobileIndicatorCount = Object.values(indicators).filter(Boolean).length;
        return mobileIndicatorCount >= 2;
    }

    /**
     * Checks if screen dimensions suggest mobile device
     */
    private hasMobileScreenDimensions(): boolean {
        if (!globalThis || !window.screen) {
            return false;
        }

        const { width, height } = window.screen;
        const maxDimension = Math.max(width, height);
        const minDimension = Math.min(width, height);

        // Typical mobile screen characteristics
        // Most phones: width <= 428px, most tablets: width <= 1024px
        return maxDimension <= 1024 && minDimension <= 768;
    }

    /**
     * Checks for mobile browser signatures that might leak through in desktop mode
     */
    private hasMobileBrowserSignatures(ua: string): boolean {
        // Some mobile browsers leave traces even in desktop mode
        const mobileSignatures = [
            /Mobile.*Safari/, // Mobile Safari signatures
            /Chrome.*Mobile/, // Chrome mobile signatures
            /Android.*Chrome/, // Android Chrome hints
            /iPhone.*CriOS/, // Chrome on iOS hints
            /iPad.*CriOS/, // Chrome on iPad hints
            /Mobile.*Firefox/, // Firefox mobile hints
            /FxiOS/, // Firefox on iOS
        ];

        return mobileSignatures.some(pattern => pattern.test(ua));
    }

    public setDeviceInfo(ua = this._userAgent()): void {
        if (ua !== this._userAgent()) {
            this._userAgent.set(ua);
        }

        // Optimized detection with early exit
        this._os.set(this.detectFromMapping(ua, { const: 'OS', prop: 'os' }));
        this._browser.set(this.detectFromMapping(ua, { const: 'BROWSERS', prop: 'browser' }));
        this._device.set(this.detectFromMapping(ua, { const: 'DEVICES', prop: 'device' }));

        // Handle Android device refinement
        if (this._device() === Constants.DEVICES.ANDROID) {
            const deviceConstants = Constants.DEVICES;

            for (const key of Object.keys(deviceConstants)) {
                const regexPattern = Constants.DEVICES_RE[key];
                if (
                    regexPattern &&
                    this.reTree().test(ua, regexPattern) &&
                    deviceConstants[key] !== Constants.DEVICES.ANDROID
                ) {
                    this._device.set(deviceConstants[key]);
                    break; // Early exit when found
                }
            }
        }

        this._os_version.set(this.detectFromMapping(ua, { const: 'OS_VERSIONS', prop: 'os_version' }));

        // Browser version detection - only if browser is known
        this._browser_version.set('0');
        if (this.browser() !== Constants.BROWSERS.UNKNOWN) {
            const re = Constants.BROWSER_VERSIONS_RE[this.browser()];
            if (re) {
                const res = this.reTree().exec(ua, re);
                if (res) {
                    this._browser_version.set(res[1]);
                }
            }
        }

        // Orientation detection
        if (globalThis?.matchMedia) {
            this._orientation.set(
                globalThis.matchMedia('(orientation: landscape)').matches
                    ? OrientationType.Landscape
                    : OrientationType.Portrait,
            );
        } else {
            this._orientation.set(Constants.GENERAL.UKNOWN as OrientationType);
        }

        // Device type detection - lazy evaluation
        if (this.isTablet()) {
            this._deviceType.set(DeviceType.Tablet);
        } else if (this.isMobile()) {
            this._deviceType.set(DeviceType.Mobile);
        } else if (this.isDesktop()) {
            this._deviceType.set(DeviceType.Desktop);
        } else {
            this._deviceType.set(DeviceType.Unknown);
        }

        // Desktop mode detection - check if mobile device is masquerading as desktop
        this._isDesktopMode.set(this.detectDesktopMode(ua));
    }

    /**
     * @author Ahsan Ayaz
     * @desc Returns the device information
     * @deprecated Use `deviceInfo` signal instead.
     * @returns the device information object.
     */
    public getDeviceInfo(): DeviceInfo {
        return {
            userAgent: this.userAgent(),
            os: this.os(),
            browser: this.browser(),
            device: this.device(),
            os_version: this.os_version(),
            browser_version: this.browser_version(),
            deviceType: this.deviceType(),
            orientation: this.orientation(),
            isDesktopMode: this.isDesktopMode(),
        };
    }

    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the mobile devices to check
     * if the current device is a mobile and also check current device is tablet so it will return false.
     * @returns whether the current device is a mobile
     */
    public isMobile(userAgent = this.userAgent()): boolean {
        if (this.isTablet(userAgent)) {
            return false;
        }

        // Early exit optimization - stop at first match
        for (const key of Object.keys(Constants.MOBILES_RE)) {
            if (this.reTree().test(userAgent, Constants.MOBILES_RE[key])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the tablet devices to check
     * if the current device is a tablet.
     * @returns whether the current device is a tablet
     */
    public isTablet(userAgent = this.userAgent()): boolean {
        // iOS 13 Tablet special case
        if (
            isPlatformBrowser(this.platformId) &&
            (!!this.reTree().test(this.userAgent(), Constants.TABLETS_RE[iPad]) ||
                (typeof navigator !== 'undefined' &&
                    navigator.platform &&
                    navigator.platform.includes('Mac') &&
                    navigator.maxTouchPoints > 1))
        ) {
            return true;
        }

        // Early exit optimization - stop at first match
        for (const key of Object.keys(Constants.TABLETS_RE)) {
            if (this.reTree().test(userAgent, Constants.TABLETS_RE[key])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the desktop devices to check
     * if the current device is a desktop device.
     * @returns whether the current device is a desktop device
     */
    public isDesktop(userAgent = this.userAgent()): boolean {
        if (this.device() === Constants.DEVICES.UNKNOWN && (this.isMobile(userAgent) || this.isTablet(userAgent))) {
            return false;
        }
        return Constants.DESKTOP_DEVICES.includes(this.device());
    }

    /**
     * @desc Checks if the current device is a mobile device running in desktop mode.
     * Desktop mode occurs when mobile browsers request desktop websites by sending
     * desktop user agent strings while retaining mobile hardware characteristics.
     * @returns whether the current device is in desktop mode
     */
    public isDesktopModeEnabled(): boolean {
        return this.isDesktopMode();
    }
}
