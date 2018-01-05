import { Ng2DeviceDetectorDemoPage } from './app.po';

describe('ngx-device-detector-demo App', () => {
  let page: Ng2DeviceDetectorDemoPage;

  beforeEach(() => {
    page = new Ng2DeviceDetectorDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getDemoHeadingText()).toEqual('ngx-device-detector demo');
  });

  it('should display device information in table', () => {
    page.navigateTo();
    const infoElements = page.getDeviceInfoElements();
    expect(infoElements.count()).toEqual(6);
  });
});
