
## ng2-device-detector
[![CI Status](http://img.shields.io/travis/KoderLabs/ng2-device-detector.svg?style=flat)](https://travis-ci.org/KoderLabs/ng2-device-detector)
[![npm version](https://img.shields.io/npm/v/ng2-device-detector.svg)](https://www.npmjs.com/package/ng2-device-detector) [![npm downloads](https://img.shields.io/npm/dm/ng2-device-detector.svg)](https://www.npmjs.com/package/ng2-device-detector)
[![npm](https://img.shields.io/npm/dt/ng2-device-detector.svg?style=flat-square)](https://github.com/KoderLabs/ng2-device-detector)
[![GitHub stars](https://img.shields.io/github/stars/KoderLabs/ng2-device-detector.svg?style=social&label=Star&style=flat-square)](https://github.com/KoderLabs/ng2-device-detector)
[![npm](https://img.shields.io/npm/l/ng2-device-detector.svg?style=flat-square)](https://github.com/KoderLabs/ng2-device-detector)


> An Angular 2 (and beyond) powered AOT compatible device detector that helps to identify browser, os and other useful information regarding the device using the app. The processing is based on user-agent.

## Breaking changes in 1.0.0
The module name and the service name has been changed. See the Usage and Change Log sections below

## Live DEMO

[Ng2 Device Detector Demo](https://koderlabs.github.io/ng2-device-detector)



## Installation

To install this library, run:

```bash
$ npm install ng2-device-detector --save
```

## Usage
Import `Ng2DeviceDetectorModule` in your app.module.ts
```bash
  import { NgModule } from '@angular/core';
  import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
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
      Ng2DeviceDetectorModule.forRoot()
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
  import { Ng2DeviceService } from 'ng2-device-detector';
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
    constructor(..., private http: Http, private deviceService: Ng2DeviceService) {
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

#1.0.0 

- Renamed the Service from `Device` to `Ng2DeviceService`
- Renamed the Module from `Ng2DeviceDetector` to `Ng2DeviceDetectorModule`
- Import has changed from `imports: [Ng2DeviceDetectorModule]` to `imports: [Ng2DeviceDetectorModule.forRoot()]`
