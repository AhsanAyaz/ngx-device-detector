import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { DeviceDetectorService } from '../src/device-detector.service';
import * as Constants from './../src/device-detector.constants';

describe('ThinkingStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectorService]
    });
  });

  it('should be created', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return device info', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) Version/11.0 Mobile/15A372 Safari/604.1`;
    service.os = 'IOS';
    service.browser = 'Safari';
    service.device = 'iPhone';
    service.os_version = '11.0';
    service.browser_version = '604.1';
    const deviceInformations = {
      userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) Version/11.0 Mobile/15A372 Safari/604.1`,
      os: 'IOS',
      browser: 'Safari',
      device: 'iPhone',
      os_version: '11.0',
      browser_version: '604.1'
    }
    expect(service.getDeviceInfo()).toEqual(deviceInformations);
  }));

  it('should return true when system is desktop', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';
    expect(service.isDesktop()).toBeTruthy();
  }));

  it('should return false when system is not desktop', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko)
      Version/11.0 Mobile/15A5341f Safari/604.1`;
    expect(service.isDesktop()).toBeFalsy();
  }));

  it('should return true when system is tablet', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko)
      Version/11.0 Mobile/15A5341f Safari/604.1`;
    expect(service.isTablet()).toBeTruthy();
  }));

  it('should return false when system is not tablet', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isTablet()).toBeFalsy();
  }));

  it('should return true when system is mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X)
      AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`;
    expect(service.isMobile()).toBeTruthy();
  }));

  it('should return false when system is not mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isMobile()).toBeFalsy();
  }));

});
