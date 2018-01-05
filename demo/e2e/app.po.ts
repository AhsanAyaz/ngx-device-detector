import { browser, by, element } from 'protractor';

export class Ng2DeviceDetectorDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getDemoHeadingText() {
    return element(by.css('dd-root .demo-heading-text')).getText();
  }

  getDeviceInfoElements() {
    return element.all(by.css('dd-root .information-table .info-item'));
  }

  getParagraphText() {
    return element(by.css('dd-root h1')).getText();
  }
}
