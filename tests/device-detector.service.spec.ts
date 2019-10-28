import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { DeviceDetectorService } from '../src/device-detector.service';

describe('DeviceDetectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectorService]
    });
  });

  it('should be created', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return device info object when getDeviceInfo is called', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1';
    (service as any)._setDeviceInfo(userAgent);
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

  it('should return device details when system is desktop', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';
    (service as any)._setDeviceInfo(userAgent);
    expect(service.isDesktop(userAgent)).toBeTruthy();
    expect(service.os).toBe('Linux');
    expect(service.browser).toBe('Chrome');
    expect(service.browser_version).toBe('74.0.3729.131');
  }));

  // tslint:disable-next-line: max-line-length
  it('should return false when isDesktop is called on a non-desktop userAgent', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line:max-line-length
    const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1`;
    expect(service.isDesktop(userAgent)).toBeFalsy();
  }));

  it('should return true, os=`Mac`, browser=`Safari`, device=`iPad` and browser_version=`11.0` when system is tablet',
    inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 Version/11.0 Mobile/15A5341f Safari/604.1`;
    (service as any)._setDeviceInfo(userAgent);
    expect(service.isTablet(userAgent)).toBeTruthy();
    expect(service.os).toBe('Mac');
    expect(service.browser).toBe('Safari');
    expect(service.device).toBe('iPad');
    expect(service.browser_version).toBe('11.0');
  }));

  it('should return false when system is not tablet', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isTablet(userAgent)).toBeFalsy();
  }));

  it('should return true, os=`iOS`, browser=`Safari`, device=`iPhone` and browser_version=`11.0` when system is mobile',
    inject([DeviceDetectorService], (service: DeviceDetectorService) => {
      // tslint:disable-next-line:max-line-length
      const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`;
      (service as any)._setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeTruthy();
      expect(service.os).toBe('iOS');
      expect(service.browser).toBe('Safari');
      expect(service.device).toBe('iPhone');
      expect(service.browser_version).toBe('11.0');
  }));

  it('should return false when system is not mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36`;
    expect(service.isMobile(userAgent)).toBeFalsy();
  }));

  it('should detect iOS 13 for iPhone', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line:max-line-length
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15'
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeTruthy();
  }))

  it('should detect iPhone 11', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac O…ke Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
  }))

  it('should detect laptop Macintosh Laptop as Desktop', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) Ap…L, like Gecko) Chrome/77.0.3865.120 Safari/537.36';
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeTruthy();
    expect(service.isTablet(userAgent)).toBeFalsy();
  }))

  it('should detect Pixel2 as mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD… Gecko) Chrome/77.0.3865.120 Mobile Safari/537.36'
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
  }))

});
