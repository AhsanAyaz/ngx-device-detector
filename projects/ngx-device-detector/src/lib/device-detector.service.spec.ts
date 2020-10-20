import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { DeviceDetectorService } from './device-detector.service';

describe('DeviceDetectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectorService],
    });
  });

  it('should be created', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return device info object when getDeviceInfo is called', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1';
      service.setDeviceInfo(userAgent);
      const deviceInformations = {
        userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`,
        os: 'iOS',
        browser: 'Safari',
        device: 'iPhone',
        os_version: 'iOS',
        browser_version: '11.0',
        deviceType: 'mobile',
        orientation: 'landscape',
      };
      expect(service.getDeviceInfo()).toEqual(deviceInformations);
    }
  ));

  it('should return device details when system is desktop', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expect(service.isDesktop(userAgent)).toBeTruthy();
      expect(service.os).toBe('Linux');
      expect(service.browser).toBe('Chrome');
      expect(service.browser_version).toBe('74.0.3729.131');
    }
  ));

  // tslint:disable-next-line: max-line-length
  it('should return false when isDesktop is called on a non-desktop userAgent', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      // tslint:disable-next-line:max-line-length
      const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1`;
      expect(service.isDesktop(userAgent)).toBeFalsy();
    }
  ));

  it('should return true, os=`Mac`, browser=`Safari`, device=`iPad` and browser_version=`11.0` when system is tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 Version/11.0 Mobile/15A5341f Safari/604.1`;
      service.setDeviceInfo(userAgent);
      expect(service.isTablet(userAgent)).toBeTruthy();
      expect(service.os).toBe('iOS');
      expect(service.browser).toBe('Safari');
      expect(service.device).toBe('iPad');
      expect(service.browser_version).toBe('11.0');
    }
  ));

  it('should return false when system is not tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
      expect(service.isTablet(userAgent)).toBeFalsy();
    }
  ));

  it('should return true, os=`iOS`, browser=`Safari`, device=`iPhone` and browser_version=`11.0` when system is mobile', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      // tslint:disable-next-line:max-line-length
      const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 Version/11.0 Mobile/15A372 Safari/604.1`;
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeTruthy();
      expect(service.os).toBe('iOS');
      expect(service.browser).toBe('Safari');
      expect(service.device).toBe('iPhone');
      expect(service.browser_version).toBe('11.0');
    }
  ));

  it('should return false when system is not mobile', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36`;
      expect(service.isMobile(userAgent)).toBeFalsy();
    }
  ));

  it('should detect Tesla given the user agents', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line: max-line-length
    const userAgent = `Mozilla/5.0 (X11; GNU/Linux) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/75.0.3770.100 Chrome/75.0.3770.100 Safari/537.36 Tesla/2019.32.11.1-d39e85a`;
    service.setDeviceInfo(userAgent);
    expect(service.device).toBe('Tesla');
  }));

  // commenting this test for now until we have a good way of detecting using userAgent
  xit('should detect iOS 13 for iPhone', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line:max-line-length
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15';
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeTruthy();
  }));

  it('should detect iPhone 11', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac O…ke Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
  }));

  it('should detect laptop Macintosh Laptop as Desktop', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) Ap…L, like Gecko) Chrome/77.0.3865.120 Safari/537.36';
      expect(service.isMobile(userAgent)).toBeFalsy();
      expect(service.isDesktop(userAgent)).toBeTruthy();
      expect(service.isTablet(userAgent)).toBeFalsy();
    }
  ));

  it('should detect Pixel2 as mobile', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD… Gecko) Chrome/77.0.3865.120 Mobile Safari/537.36';
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
  }));

  it('should not consider a desktop device as tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      // tslint:disable-next-line:max-line-length
      const userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36';
      expect(service.isMobile(userAgent)).toBeFalsy();
      expect(service.isDesktop(userAgent)).toBeTruthy();
      expect(service.isTablet(userAgent)).toBeFalsy();
    }
  ));

  it('should detect Firefox in iOS', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line:max-line-length
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/20.1 Mobile/15E148 Safari/605.1.15';
    service.setDeviceInfo(userAgent);
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
    const deviceInfo = service.getDeviceInfo();
    expect(deviceInfo.device).toBe('iPhone');
    expect(deviceInfo.browser).toBe('Firefox');
    expect(deviceInfo.browser_version).toBe('20.1');
    expect(deviceInfo.os_version).toBe('iOS');
  }));
});
