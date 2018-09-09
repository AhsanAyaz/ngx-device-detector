# Change Log

#1.3.3
- Minor patch for UC browser detection [#51](https://github.com/KoderLabs/ngx-device-detector/pull/51). Thanks to [Gailbear](https://github.com/Gailbear)

#1.3.2
- Minor patch for edge version detection [#49](https://github.com/KoderLabs/ngx-device-detector/pull/49). Thanks to [pmcelreavy](https://github.com/pmcelreavy)

#1.3.1
- Added better support for Android Browsers [#48](https://github.com/Koderlabs/ngx-device-detector/pulls/48). Thanks to [Gailbear](https://github.com/Gailbear)

#1.3.0 **(contains breaking changes)**
- Added support for angular 6 [#37](https://github.com/KoderLabs/ngx-device-detector/issues/37)
- Drop support for angular 4

#1.2.3
- Updated the readme for IE support

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
