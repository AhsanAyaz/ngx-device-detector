import { TestBed, inject } from '@angular/core/testing';
import { DeviceDetectorService } from './device-detector.service';

function expectAsTablet(service, userAgent) {
  expect(service.isMobile(userAgent)).toBeFalsy();
  expect(service.isDesktop(userAgent)).toBeFalsy();
  expect(service.isTablet(userAgent)).toBeTruthy();
}

describe('DeviceDetectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetectorService],
    });
  });

  it('should be created', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return device info object for iPhone when getDeviceInfo is called', inject(
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
        os_version: 'mac-os-x-11-0',
        browser_version: '11.0',
        deviceType: 'mobile',
        orientation: 'Unknown',
        isDesktopMode: false,
      };
      expect(service.getDeviceInfo()).toEqual(deviceInformations);
    },
  ));

  it('should return device details when system is desktop and using Linux & Chrome', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expect(service.isDesktop(userAgent)).toBeTruthy();
      expect(service.os).toBe('Linux');
      expect(service.browser).toBe('Chrome');
      expect(service.browser_version).toBe('74.0.3729.131');
    },
  ));

  // tslint:disable-next-line: max-line-length
  it('should detect an iPad correctly', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line:max-line-length
    const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1`;
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeTruthy();
    expect(service.isMobile(userAgent)).toBeFalsy();
  }));

  it('should return true, os=`Mac`, browser=`Safari`, device=`iPad` and browser_version=`11.0` when system is iPad tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 Version/11.0 Mobile/15A5341f Safari/604.1`;
      service.setDeviceInfo(userAgent);
      expectAsTablet(service, userAgent);
      expect(service.os).toBe('iOS');
      expect(service.browser).toBe('Safari');
      expect(service.device).toBe('iPad');
      expect(service.browser_version).toBe('11.0');
    },
  ));

  it('should return false when system is not tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/74.0.3729.131 Safari/537.36`;
      expect(service.isTablet(userAgent)).toBeFalsy();
    },
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
    },
  ));

  it('should return false when system is not mobile', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36`;
      expect(service.isMobile(userAgent)).toBeFalsy();
    },
  ));

  it('should detect Tesla given the user agents', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    // tslint:disable-next-line: max-line-length
    const userAgent = `Mozilla/5.0 (X11; GNU/Linux) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/75.0.3770.100 Chrome/75.0.3770.100 Safari/537.36 Tesla/2019.32.11.1-d39e85a`;
    service.setDeviceInfo(userAgent);
    expect(service.device).toBe('Tesla');
  }));

  // commenting this test for now until we have a good way of detecting using userAgent
  // xit('should detect iOS 13 for iPhone', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
  //   // tslint:disable-next-line:max-line-length
  //   const userAgent =
  //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15';
  //   expect(service.isMobile(userAgent)).toBeFalsy();
  //   expect(service.isDesktop(userAgent)).toBeFalsy();
  //   expect(service.isTablet(userAgent)).toBeTruthy();
  // }));

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
    },
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
    },
  ));

  it('should detect Firefox in iOS', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
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

  it('should detect Firefox in Mac', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Firefox v 82.0.3 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:82.0) Gecko/20100101 Firefox/82.0';
    service.setDeviceInfo(userAgent);
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeTruthy();
    expect(service.isTablet(userAgent)).toBeFalsy();
    const deviceInfo = service.getDeviceInfo();
    expect(deviceInfo.device).toBe('Macintosh');
    expect(deviceInfo.browser).toBe('Firefox');
    expect(deviceInfo.browser_version).toBe('82.0');
    expect(deviceInfo.os_version).toBe('mac-os-x-16');
  }));

  it('should detect Firefox 135 in macOS correctly (not as MS-Edge-Chromium)', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      // Test multiple Firefox 135 variants
      const userAgents = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15) Gecko/20100101 Firefox/135.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/135.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:135.0) Gecko/20100101 Firefox/135.0',
      ];

      userAgents.forEach((userAgent, index) => {
        service.setDeviceInfo(userAgent);

        expect(service.isMobile(userAgent)).toBeFalsy();
        expect(service.isDesktop(userAgent)).toBeTruthy();
        expect(service.isTablet(userAgent)).toBeFalsy();
        const deviceInfo = service.getDeviceInfo();
        expect(deviceInfo.device).toBe('Macintosh');
        expect(deviceInfo.browser).toBe('Firefox');
        expect(deviceInfo.browser_version).toBe('135.0');
        expect(deviceInfo.os).toBe('Mac');
      });
    },
  ));

  it('should correctly detect Firefox vs MS-Edge-Chromium on macOS', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      // Test the reported user agent string from the GitHub issue
      const firefoxUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0';
      service.setDeviceInfo(firefoxUA);

      expect(service.isMobile(firefoxUA)).toBeFalsy();
      expect(service.isDesktop(firefoxUA)).toBeTruthy();
      expect(service.isTablet(firefoxUA)).toBeFalsy();

      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Macintosh');
      expect(deviceInfo.browser).toBe('Firefox');
      expect(deviceInfo.browser_version).toBe('137.0');
      expect(deviceInfo.os).toBe('Mac');
      expect(deviceInfo.deviceType).toBe('desktop');

      // Ensure it's NOT detected as MS-Edge-Chromium
      expect(deviceInfo.browser).not.toBe('MS-Edge-Chromium');
    },
  ));

  it('should detect Chrome in Mac', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Google Chrome v 86.0 - Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36';
    service.setDeviceInfo(userAgent);
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeTruthy();
    expect(service.isTablet(userAgent)).toBeFalsy();
    const deviceInfo = service.getDeviceInfo();
    expect(deviceInfo.device).toBe('Macintosh');
    expect(deviceInfo.browser).toBe('Chrome');
    expect(deviceInfo.browser_version).toBe('86.0.4240.198');
    expect(deviceInfo.os_version).toBe('mac-os-x-11-0');
  }));

  it('should detect Safari in iPad', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.25 (KHTML, like Gecko) Version/11.0 Mobile/15A5304j Safari/604.1';
    service.setDeviceInfo(userAgent);
    expect(service.isMobile(userAgent)).toBeFalsy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeTruthy();
    const deviceInfo = service.getDeviceInfo();
    expect(deviceInfo.device).toBe('iPad');
    expect(deviceInfo.browser).toBe('Safari');
    expect(deviceInfo.browser_version).toBe('11.0');
    expect(deviceInfo.os_version).toBe('mac-os-x-11-0');
  }));

  it('should detect Chrome in Android', inject([DeviceDetectorService], (service: DeviceDetectorService) => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 9; en-us; Mi 9 SE Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.141 Mobile Safari/537.36 XiaoMi/MiuiBrowser/11.4.3-g';
    service.setDeviceInfo(userAgent);
    expect(service.isMobile(userAgent)).toBeTruthy();
    expect(service.isDesktop(userAgent)).toBeFalsy();
    expect(service.isTablet(userAgent)).toBeFalsy();
    const deviceInfo = service.getDeviceInfo();
    expect(deviceInfo.device).toBe('Android');
    expect(deviceInfo.browser).toBe('Chrome');
    expect(deviceInfo.browser_version).toBe('71.0.3578.141');
    expect(deviceInfo.os_version).toBe('android-9');
  }));

  it('should detect Device type in Alcatel Firefox OS Mobile 48.0 version', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = 'Mozilla/5.0 (Mobile; ALCATEL 4052R; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5.2';
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeTruthy();
      expect(service.isDesktop(userAgent)).toBeFalsy();
      expect(service.isTablet(userAgent)).toBeFalsy();
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Firefox-OS');
      expect(deviceInfo.browser).toBe('Firefox');
      expect(deviceInfo.browser_version).toBe('48.0');
      expect(deviceInfo.deviceType).toBe('mobile');
    },
  ));

  it('should detect Device type in Alcatel Firefox OS Mobile 49.0 version', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent = 'Mozilla/5.0 (Mobile; rv:49.0) Gecko/49.0 Firefox/49.0';
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeTruthy();
      expect(service.isDesktop(userAgent)).toBeFalsy();
      expect(service.isTablet(userAgent)).toBeFalsy();
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Firefox-OS');
      expect(deviceInfo.browser).toBe('Firefox');
      expect(deviceInfo.browser_version).toBe('49.0');
      expect(deviceInfo.deviceType).toBe('mobile');
    },
  ));

  it('should detect Device Honeywell RT10A as a tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 10; RT10A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeFalsy();
      expect(service.isDesktop(userAgent)).toBeFalsy();
      expect(service.isTablet(userAgent)).toBeTruthy();
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Android');
      expect(deviceInfo.browser).toBe('Chrome');
      expect(deviceInfo.browser_version).toBe('87.0.4280.101');
      expect(deviceInfo.deviceType).toBe('tablet');
    },
  ));

  /**
   * Issues list below
   * https://github.com/AhsanAyaz/ngx-device-detector/issues/191
   * https://github.com/AhsanAyaz/ngx-device-detector/issues/194
   * https://github.com/AhsanAyaz/ngx-device-detector/issues/180
   */
  it('should detect the missing tablets reported by community', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      let userAgent =
        'Mozilla/5.0 (Linux; Android 9; SM-T865) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expectAsTablet(service, userAgent);
      userAgent =
        'Mozilla/5.0 (Linux; Android 9; Lenovo TB-X606F Build/PPR1.180610.011;wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.185 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expectAsTablet(service, userAgent);
      userAgent =
        'Mozilla/5.0 (Linux; Android 10; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expectAsTablet(service, userAgent);
    },
  ));

  it('should detect Device HUAWEI AGS-L09 as a tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 7.0; AGS-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeFalsy();
      expect(service.isDesktop(userAgent)).toBeFalsy();
      expect(service.isTablet(userAgent)).toBeTruthy();
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Android');
      expect(deviceInfo.browser).toBe('Chrome');
      expect(deviceInfo.browser_version).toBe('103.0.0.0');
      expect(deviceInfo.deviceType).toBe('tablet');
    },
  ));

  it('should detect Device Samsung Galaxy Tab S7+ as a tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 11; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expect(service.isMobile(userAgent)).toBeFalsy();
      expect(service.isDesktop(userAgent)).toBeFalsy();
      expect(service.isTablet(userAgent)).toBeTruthy();
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Android');
      expect(deviceInfo.browser).toBe('Chrome');
      expect(deviceInfo.browser_version).toBe('88.0.4324.152');
      expect(deviceInfo.deviceType).toBe('tablet');
    },
  ));

  it('should detect Samsung Galaxy Tab SM-T515 as tablet', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgent =
        'Mozilla/5.0 (Linux; Android 10; SM-T515) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Safari/537.36';
      service.setDeviceInfo(userAgent);
      expectAsTablet(service, userAgent);
      const deviceInfo = service.getDeviceInfo();
      expect(deviceInfo.device).toBe('Android');
      expect(deviceInfo.browser).toBe('Chrome');
      expect(deviceInfo.browser_version).toBe('90.0.4430.66');
      expect(deviceInfo.deviceType).toBe('tablet');
    },
  ));

  it('should have improved performance for setDeviceInfo', inject(
    [DeviceDetectorService],
    (service: DeviceDetectorService) => {
      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 10; SM-T515) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      ];

      const iterations = 100;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        for (const ua of userAgents) {
          service.setDeviceInfo(ua);
        }
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTimePerCall = totalTime / (iterations * userAgents.length);

      // Performance metrics for verification (uncomment for debugging)
      // console.log(`Total time for ${iterations * userAgents.length} calls: ${totalTime.toFixed(2)}ms`);
      // console.log(`Average time per setDeviceInfo call: ${avgTimePerCall.toFixed(2)}ms`);

      // Performance expectation: should be faster than 5ms per call on modern devices
      // This is much better than the reported 85.96ms
      expect(avgTimePerCall).toBeLessThan(5);
    },
  ));

  describe('Desktop Mode Detection', () => {
    it('should detect regular desktop as NOT in desktop mode', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        const desktopUA =
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        service.setDeviceInfo(desktopUA);

        expect(service.isDesktopModeEnabled()).toBeFalsy();
        expect(service.getDeviceInfo().isDesktopMode).toBeFalsy();
        expect(service.getDeviceInfo().deviceType).toBe('desktop');
      },
    ));

    it('should detect regular mobile as NOT in desktop mode', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        const mobileUA =
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1';
        service.setDeviceInfo(mobileUA);

        expect(service.isDesktopModeEnabled()).toBeFalsy();
        expect(service.getDeviceInfo().isDesktopMode).toBeFalsy();
        expect(service.getDeviceInfo().deviceType).toBe('mobile');
      },
    ));

    it('should detect tablet as NOT in desktop mode', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        const tabletUA =
          'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1';
        service.setDeviceInfo(tabletUA);

        expect(service.isDesktopModeEnabled()).toBeFalsy();
        expect(service.getDeviceInfo().isDesktopMode).toBeFalsy();
        expect(service.getDeviceInfo().deviceType).toBe('tablet');
      },
    ));

    // Note: These tests simulate desktop mode scenarios, but since we can't mock
    // browser APIs like touch support in Jest without significant setup,
    // we test the logic flow and ensure proper integration
    it('should include isDesktopMode property in device info', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        const userAgent =
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        service.setDeviceInfo(userAgent);

        const deviceInfo = service.getDeviceInfo();
        expect(deviceInfo.hasOwnProperty('isDesktopMode')).toBeTruthy();
        expect(typeof deviceInfo.isDesktopMode).toBe('boolean');
      },
    ));

    it('should have isDesktopModeEnabled method available', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        expect(typeof service.isDesktopModeEnabled).toBe('function');
        expect(typeof service.isDesktopModeEnabled()).toBe('boolean');
      },
    ));

    it('should maintain consistency between isDesktopModeEnabled method and DeviceInfo property', inject(
      [DeviceDetectorService],
      (service: DeviceDetectorService) => {
        const userAgent =
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        service.setDeviceInfo(userAgent);

        const deviceInfo = service.getDeviceInfo();
        expect(service.isDesktopModeEnabled()).toEqual(deviceInfo.isDesktopMode);
      },
    ));
  });
});
