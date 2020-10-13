import { browser, by, element, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class AppPage {
  navigateTo(): wdpromise.Promise<any> {
    return browser.get('/');
  }

  getDemoHeadingText(): wdpromise.Promise<any> {
    return element(by.css('app-root .demo-heading-text')).getText();
  }

  getDeviceInfoElements(): ElementArrayFinder {
    return element.all(by.css('app-root .information-table .info-item'));
  }

  getParagraphText(): wdpromise.Promise<any> {
    return element(by.css('app-root h1')).getText();
  }
}
