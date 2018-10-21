<a href="https://koderlabs.github.io/ngx-device-detector">
  <h1 align="center">ngx-device-detector</h1> 
</a>

<p align="center">
An Angular 5+ powered AOT compatible device detector that helps to identify browser, os and other useful information regarding the device using the app. The processing is based on user-agent.
</p>

<p align="center">
<a href="https://travis-ci.org/KoderLabs/ngx-device-detector"><img src="http://img.shields.io/travis/KoderLabs/ngx-device-detector.svg?style=flat" alt="travis build status" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/v/ngx-device-detector.svg" alt="npm version" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/github/stars/KoderLabs/ngx-device-detector.svg?style=social&label=Star&style=flat-square" alt="github stars" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/l/ngx-device-detector.svg?style=flat-square" alt="license" ></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/ng2-device-detector">Deprecated package :</a>
  <a href="https://www.npmjs.com/package/ng2-device-detector"><img src="https://img.shields.io/npm/dt/ng2-device-detector.svg?style=flat-square" alt="npm downloads total" ></a>
  <a href="https://www.npmjs.com/package/ng2-device-detector"><img src="https://img.shields.io/npm/dm/ng2-device-detector.svg" alt="npm downloads/month" ></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/ngx-device-detector">New package :</a>
  <a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dt/ngx-device-detector.svg?style=flat-square" alt="npm downloads total" ></a>
  <a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dm/ngx-device-detector.svg" alt="npm downloads/month" ></a>
</p>


## DOCS

[Ngx Device Detector DOCS](https://koderlabs.github.io/ngx-device-detector)

## Live DEMO

[Ngx Device Detector Demo](https://koderlabs.github.io/ngx-device-detector/demo)


## Installation

To install this library, run:

```bash
$ npm install ngx-device-detector --save
```

## Usage
Import `DeviceDetectorModule` in your app.module.ts
```typescript
  import { NgModule } from '@angular/core';
  import { DeviceDetectorModule } from 'ngx-device-detector';
  ...
  @NgModule({
    declarations: [
      ...
      LoginComponent,
      SignupComponent
      ...
    ],
    imports: [
      CommonModule,
      FormsModule,
      DeviceDetectorModule.forRoot()
    ],
    providers:[
      AuthService
    ]
    ...
  })
```

In your component where you want to use the Device Service
```typescript
  import { Component } from '@angular/core';
  ...
  import { DeviceDetectorService } from 'ngx-device-detector';
  ...
  @Component({
    selector: 'home',  // <home></home>
    styleUrls: [ './home.component.scss' ],
    templateUrl: './home.component.html',
    ...
  })

  export class HomeComponent {
    deviceInfo = null;
    ...
    constructor(..., private http: Http, private deviceService: DeviceDetectorService) {
      this.epicFunction();
    }
    ...
    epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    }
    ...
  }

```

## Device service
Holds the following properties
* browser
* os
* device
* userAgent
* os_version

## Helper Methods
* **isMobile() :** returns if the device is a mobile device (android / iPhone/ windows-phone etc)
* **isTablet() :** returns if the device us a tablet (iPad etc)
* **isDesktop() :** returns if the app is running on a Desktop browser.

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
  $ npm run tsc
```

To lint all `*.ts` files:

```bash
  $ npm run lint
```

To run unit tests
```bash
  $ npm run test
```

To build the library
```bash
  $ npm run build
```


## Run the DEMO

Make sure you have @angular/cli installed

```bash
  $ npm install -g @angular/cli
```

```bash
  $ cd demo
  $ npm install
  $ ng serve
```

the demo will be up at `localhost:4200`

## Change Log

Please see [CHANGE_LOG.MD](CHANGE_LOG.MD) for the updates.

## IE10, IE11 Compatibility

If you're consuming the library for IE10 & IE11, make sure to uncomment (at least) these lines from `src/polyfills.ts` in your project.

```typescript
import 'core-js/es6/string';
import 'core-js/es6/array';
import 'core-js/es6/map';
```

## Credits

The library is inspired by and based on the work from [ng-device-detector ](https://github.com/srfrnk/ng-device-detector). Also used a typescript wrapper of the amazing work in [ReTree](https://github.com/srfrnk/re-tree) for regex based needs and an Angular2 Library Creator boilerplate to get the work started fast. I.e. [Generator Angular2 library](https://github.com/jvandemo/generator-angular2-library).

## License

MIT © [Ahsan Ayaz](https://github.com/AhsanAyaz)