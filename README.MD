<p align="center">
  <img src="https://raw.githubusercontent.com/AhsanAyaz/ngx-device-detector/master/assets/logo.svg" width="200">
</p>


<a href="https://ahsanayaz.github.io/ngx-device-detector">
  <h1 align="center">ngx-device-detector</h1>
</a>

<p align="center">
An Angular 6+ powered AOT compatible device detector that helps to identify browser, os and other useful information regarding the device using the app. The processing is based on user-agent. This library was built at <a href="https://github.com/KoderLabs">KoderLabs</a>, which is one of the best places I've worked at ❤️
</p>

<p align="center">
<a href="https://github.com/AhsanAyaz/ngx-device-detector/actions"><img src="https://github.com/ahsanayaz/ngx-device-detector/actions/workflows/main.yml/badge.svg" alt="build status" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/v/ngx-device-detector.svg" alt="npm version" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/github/license/ahsanayaz/ngx-device-detector?style=flat" alt="license" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://badgen.net/github/stars/AhsanAyaz/ngx-device-detector" alt="stars" ></a>

</p>
<p align="center">
  <a href="https://www.npmjs.com/package/ng2-device-detector">Deprecated package :</a>
  <a href="https://www.npmjs.com/package/ng2-device-detector"><img src="https://img.shields.io/npm/dt/ng2-device-detector.svg?style=flat-square" alt="npm downloads total" ></a>
  <a href="https://www.npmjs.com/package/ng2-device-detector"><img src="https://img.shields.io/npm/dm/ng2-device-detector.svg" alt="npm downloads/month" ></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/ngx-device-detector">New package :</a>
  <a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dt/ngx-device-detector.svg?style=flat-square" alt="npm downloads total" ></a>
  <a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dm/ngx-device-detector.svg" alt="npm downloads/month" ></a><br><br>
If you use Angular 5, you must use v1.5.2 or earlier
</p>

## DOCS

[Ngx Device Detector DOCS](https://ahsanayaz.github.io/ngx-device-detector)

## Live DEMO

[Regular Demo](https://ahsanayaz.github.io/ngx-device-detector/demo)

<!-- [SSR Demo](https://ngx-device-detector-ssr.herokuapp.com/) -->

## Dependencies

Latest version available for each version of Angular

| ngx-device-detector | Angular |
|---------------------|---------|
| 1.3.3               | 7.x     |
| 1.3.5               | 8.x     |
| 1.4.1               | 9.x     |
| 1.4.5               | 10.x    |
| 2.0.5               | 11.x    |
| 2.1.0               | 12.x    |
| 3.x.x               | 13.x    |
| 4.x.x               | 14.x    |
| 5.x.x               | 15.x    |
| 6.x.x               | 16.x    |
| 7.x.x               | 17.x    |
| 8.x.x               | 18.x    |
| 9.x.x               | 19.x    |

## Installation

To install this library, run:

```bash
$ npm install ngx-device-detector --save
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

For SSR, you have to make sure that the User Agent is available for device detection. I.e. you'll need to provide it manually. If using ExpressJS for example:

**express.tokens.ts**

```typescript
import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');
```

**universal-device-detector.service.ts:**

```typescript
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from 'path/to/express.tokens';
import { Request } from 'express';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class UniversalDeviceDetectorService extends DeviceDetectorService {
  constructor(@Inject(PLATFORM_ID) platformId: any, @Optional() @Inject(REQUEST) request: Request) {
    super(platformId);
    if (isPlatformServer(platformId)) {
      super.setDeviceInfo((request.headers['user-agent'] as string) || '');
    }
  }
}
```

**app.server.module.ts:**

```typescript
{
  provide: DeviceDetectorService,
  useClass: UniversalDeviceDetectorService
},
```

## Device service

Holds the following properties

- browser
- os
- device
- userAgent
- os_version

## Helper Methods

- **isMobile() :** returns if the device is a mobile device (android / iPhone/ windows-phone etc)
- **isTablet() :** returns if the device us a tablet (iPad etc)
- **isDesktop() :** returns if the app is running on a Desktop browser.

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

## Credits

The library is inspired by and based on the work from [ng-device-detector ](https://github.com/srfrnk/ng-device-detector). Also used a typescript wrapper of the amazing work in [ReTree](https://github.com/srfrnk/re-tree) for regex based needs and an Angular2 Library Creator boilerplate to get the work started fast. I.e. [Generator Angular2 library](https://github.com/jvandemo/generator-angular2-library).

## License

[MIT](https://github.com/AhsanAyaz/ngx-device-detector/blob/master/LICENSE)

## Need help with your Angular/Web projects
Write to us at [IOMechs](mailto:info@iomechs.com)
