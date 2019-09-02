import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { DeviceDetectorService } from '../src/device-detector.service';

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
    service.ua = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`;
    (service as any)._setDeviceInfo();
    const deviceInformations = {
      userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`,
      os: 'iOS',
      browser: 'Safari',
      device: 'iPhone',
      os_version: 'unknown',
      browser_version: '11.0'
    }
    expect(service.getDeviceInfo()).toEqual(deviceInformations);
  }));

  it('should return true, os=`Linux`, browser=`Chrome`, and browser_version=`74.0.3729.131` when system is desktop',
    inject([DeviceDetectorService], (service: DeviceDetectorService) => {
      service.ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';
    (service as any)._setDeviceInfo();
    expect(service.isDesktop()).toBeTruthy();
    expect(service.os).toBe('Linux');
    expect(service.browser).toBe('Chrome');
    expect(service.browser_version).toBe('74.0.3729.131');
  }));

  it('should return false when system is not desktop', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko)
      Version/11.0 Mobile/15A5341f Safari/604.1`;
    expect(service.isDesktop()).toBeFalsy();
  }));

  it('should return true, os=`Mac`, browser=`Safari`, device=`iPad` and browser_version=`11.0` when system is tablet',
    inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.ua = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 Version/11.0 Mobile/15A5341f Safari/604.1`;
    (service as any)._setDeviceInfo();
    expect(service.isTablet()).toBeTruthy();
    expect(service.os).toBe('Mac');
    expect(service.browser).toBe('Safari');
    expect(service.device).toBe('iPad');
    expect(service.browser_version).toBe('11.0');
  }));

  it('should return false when system is not tablet', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isTablet()).toBeFalsy();
  }));

  it('should return true, os=`iOS`, browser=`Safari`, device=`iPhone` and browser_version=`11.0` when system is mobile',
    inject([DeviceDetectorService], (service: DeviceDetectorService) => {
      service.ua = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`;
      (service as any)._setDeviceInfo();
      expect(service.isMobile()).toBeTruthy();
      expect(service.os).toBe('iOS');
      expect(service.browser).toBe('Safari');
      expect(service.device).toBe('iPhone');
      expect(service.browser_version).toBe('11.0');
  }));

  it('should return false when system is not mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    service.userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isMobile()).toBeFalsy();
  }));

});
