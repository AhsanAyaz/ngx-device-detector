import { Component, VERSION, inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector'
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
    private readonly deviceService = inject(DeviceDetectorService);

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
    protected readonly deviceInfo = this.deviceService.deviceInfo;
    protected readonly version = VERSION.full;
    private readonly ua = globalThis.navigator.userAgent;

    constructor() {
        this.applyDevice();
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
    }

    resetDeviceInfo(): void {
        this.applyDevice();
    }
}
