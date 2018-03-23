<a href="https://koderlabs.github.io/ngx-device-detector">
    <h1 align="center">ngx-device-detector</h1> 
</a>

<p align="center">
An Angular 2 (and beyond) powered AOT compatible device detector that helps to identify browser, os and other useful information regarding the device using the app. The processing is based on user-agent.
</p>

<p align="center">
<a href="https://travis-ci.org/KoderLabs/ngx-device-detector"><img src="http://img.shields.io/travis/KoderLabs/ngx-device-detector.svg?style=flat" alt="travis build status" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/v/ngx-device-detector.svg" alt="npm version" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dm/ngx-device-detector.svg" alt="npm downloads/month" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dt/ngx-device-detector.svg?style=flat-square" alt="npm downloads total" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/github/stars/KoderLabs/ngx-device-detector.svg?style=social&label=Star&style=flat-square" alt="github stars" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/l/ngx-device-detector.svg?style=flat-square" alt="license" ></a>
</p>


## Live DEMO

[Ngx Device Detector Demo](https://koderlabs.github.io/ngx-device-detector)


## Installation

To install this library, run:

```bash
$ npm install ngx-device-detector --save
```

## Usage
Import `DeviceDetectorModule` in your app.module.ts
```bash
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
```bash
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
      console.log(this.deviceInfo);
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

## Credits

The library is inspired by and based on the work from [ng-device-detector ](https://github.com/srfrnk/ng-device-detector). Also used a typescript wrapper of the amazing work in [ReTree](https://github.com/srfrnk/re-tree) for regex based needs and an Angular2 Library Creator boilerplate to get the work started fast. I.e. [Generator Angular2 library](https://github.com/jvandemo/generator-angular2-library).

## License

MIT © [Ahsan Ayaz](https://github.com/AhsanAyaz)


## Change Log

#1.2.2 **(contains breaking changes)**
- Removing the SSR (Universal) support because of the raising issues. 
- Will be revisiting SSR support properly in April.

#1.2.1
- moved @angular/platform-server to peer-dependencies

#1.2.0
- minor fixes
- fixed [#27](https://github.com/KoderLabs/ngx-device-detector/issues/27).

#1.1.7
- minor fixes

#1.1.6
- fixes. Readme Updated with Angular Universal dependency info

#1.1.5
- fixes #22, #23

#1.1.4
- fixes
- Support added for Angular Universal

#1.1.3
- fixes

#1.1.2
- fixes

#1.1.1
- fixes

#1.1.0 **(contains breaking changes)**

- Added official support to Angular5
- The package name has been changed to `ngx-device-detector`
- Renamed the Service from `Ng2DeviceService` to `DeviceDetectorService`
- Renamed the Module from `Ng2DeviceDetector` to `DeviceDetectorModule`

#1.0.0 **(contains breaking changes)**

- Renamed the Service from `Device` to `Ng2DeviceService`
- Renamed the Module from `Ng2DeviceDetector` to `Ng2DeviceDetectorModule`
- Import has changed from `imports: [Ng2DeviceDetectorModule]` to `imports: [Ng2DeviceDetectorModule.forRoot()]`
