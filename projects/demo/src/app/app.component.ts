import { Component, VERSION, inject, signal } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'projects/ngx-device-detector/src/lib/device-detector.service';
import { NgClass } from '@angular/common';
import { KeysPipe } from './pipes/keys.pipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NgClass, KeysPipe],
    standalone: true,
})
export class AppComponent {

    protected readonly propsToShow = [
        'userAgent',
        'os',
        'browser',
        'device',
        'os_version',
        'browser_version',
        'deviceType',
        'orientation',
        'isDesktopMode',
    ];
    protected readonly deviceInfo = signal<DeviceInfo | null>(null);
    protected readonly version = VERSION.full;
    private readonly ua = globalThis.navigator.userAgent;

    private readonly deviceService = inject(DeviceDetectorService);

    constructor() {
        this.applyDevice();
    }

    getDeviceInfo(): void {
        this.deviceInfo.set(this.deviceService.getDeviceInfo());
    }

    get isMobile(): boolean {
        return this.deviceService.isMobile();
    }

    get isTablet(): boolean {
        return this.deviceService.isTablet();
    }

    get isDesktop(): boolean {
        return this.deviceService.isDesktop();
    }

    get isDesktopMode(): boolean {
        return this.deviceService.isDesktopModeEnabled();
    }

    applyDevice(userAgent = this.ua): void {
        this.deviceService.setDeviceInfo(userAgent);
        this.getDeviceInfo();
    }

    resetDeviceInfo(): void {
        this.applyDevice();
    }
}
