import { ReTree } from './retree';
export interface DeviceInfo {
    userAgent: string;
    os: string;
    browser: string;
    device: string;
    os_version: string;
    browser_version: string;
}
export declare class DeviceDetectorService {
    private platformId;
    ua: string;
    userAgent: string;
    os: string;
    browser: string;
    device: string;
    os_version: string;
    browser_version: string;
    reTree: ReTree;
    constructor(platformId: any);
    /**
     * @author Ahsan Ayaz
     * @desc Sets the initial value of the device when the service is initiated.
     * This value is later accessible for usage
     */
    setDeviceInfo(ua?: string): void;
    /**
     * @author Ahsan Ayaz
     * @desc Returns the device information
     * @returns the device information object.
     */
    getDeviceInfo(): DeviceInfo;
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the mobile devices to check
     * if the current device is a mobile and also check current device is tablet so it will return false.
     * @returns whether the current device is a mobile
     */
    isMobile(userAgent?: string): boolean;
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the tablet devices to check
     * if the current device is a tablet.
     * @returns whether the current device is a tablet
     */
    isTablet(userAgent?: string): boolean;
    /**
     * @author Ahsan Ayaz
     * @desc Compares the current device info with the desktop devices to check
     * if the current device is a desktop device.
     * @returns whether the current device is a desktop device
     */
    isDesktop(userAgent?: string): boolean;
}
