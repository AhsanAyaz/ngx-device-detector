# Change Log

## 1.5.2 (REVERTED the introduced BREAKING CHANGES)
- **DeviceDetectorModule PUT BACK IN THE PACKAGE**. Updating from 1.4.x to 1.5.2 will have no effect

## 1.5.1
- just docs updates

## 1.5.0 (BREAKING CHANGES)
- **DeviceDetectorModule DOES NOT EXIST ANY MORE**. Please remove its imports from your code base
- using angular cli monorepo now
- validated tests
- linting issues fixed
- angular 5 support dropped

## 1.4.2
- Fixes [DeviceDetectorModule.forRoot returns a ModuleWithProviders type without a generic type argument](https://github.com/KoderLabs/ngx-device-detector/issues/144). Thanks to [PascalHonegger](https://github.com/PascalHonegger) for [PR](https://github.com/KoderLabs/ngx-device-detector/pull/145) and [millerf](https://github.com/millerf) for verifying.

## 1.4.1
- Fixes [Add angular 9.x universal support](https://github.com/KoderLabs/ngx-device-detector/issues/141). Thanks to [BruneXX](https://github.com/BruneXX) for [PR](https://github.com/KoderLabs/ngx-device-detector/pull/143)

## 1.4.0
- Fixes [Add Tesla detection](https://github.com/KoderLabs/ngx-device-detector/issues/132).
- Fixes [Galaxy Tab A is not detected (SM-T290)](https://github.com/KoderLabs/ngx-device-detector/issues/131)
- Exposed `setDeviceInfo` method from the `DeviceDetectorService`

## 1.3.20
- Fixes [Windows 10 detection](https://github.com/KoderLabs/ngx-device-detector/issues). Thanks to [Nabeel Hassan](https://github.com/Nabeelhassan).

## 1.3.19
- Fixes of Angular Universal breaking for `navigator` (same as 1.3.17 because I was sleepy)

## 1.3.18
- Fixes of Angular Universal breaking for `navigator`

## 1.3.16
- iOS Firefox detection fix

## 1.3.15
- Minor fixes

## 1.3.14
- Minor fixes

## 1.3.13
- Minor fixes

## 1.3.12
- Fixed [#113 - iPad OS13 detection](https://github.com/KoderLabs/ngx-device-detector/issues/113). Thanks to [Syed Saad Qamar](https://github.com/SaadQamar01)

## 1.3.11
- Fixed [#109 - The mobile device is determined to be a tablet](https://github.com/KoderLabs/ngx-device-detector/issues/109)

## 1.3.11
- resolved the issue of device being "Unknown"

## 1.3.9
- minor fixes
- resolved a packaging issue

## 1.3.8 (just reverts the breaking changes introduced in 1.3.7)
- Compatible with v7 and v8 projects
- Library compiled with Angular v7
- `.forRoot()` resurrected again
- fixes issue https://github.com/KoderLabs/ngx-device-detector/issues/92 and https://github.com/KoderLabs/ngx-device-detector/issues/91


## 1.3.7 **(contains breaking changes)**
- Fixed tablet and mobile devices and also fixed desktop issue. Thanks to [Syed Saad Qamar](https://github.com/Syed-Saad-Qamar) for the [PR](https://github.com/KoderLabs/ngx-device-detector/pull/84)
- Detect ms edge chromium. Thanks to [jrrod507](https://github.com/jrrod507) for the [PR](https://github.com/KoderLabs/ngx-device-detector/pull/73)

**BREAKING CHANGE**
- `DeviceDetectorModule.forRoot()` is not supported any more. Please just import `DeviceDetectorModule` in your `imports`.

## 1.3.6
- Added support for Angular 8.0
- Works with IVY engine now. (https://github.com/KoderLabs/ngx-device-detector/pull/69). Thanks to [mattlewis92](https://github.com/mattlewis92)
- Detects ms edge chromium (https://github.com/KoderLabs/ngx-device-detector/pull/73). Thanks to [jrrod507](https://github.com/jrrod507)
- Support headless chrome to be detected as Chrome browser (https://github.com/KoderLabs/ngx-device-detector/pull/61). Thanks to [tmair](https://github.com/tmair)

## 1.3.5
- Minor patches
- Uppercased names/descriptions of the properties for the UI
- (https://github.com/KoderLabs/ngx-device-detector/pull/58). Thanks to [ccd2008](https://github.com/ccd2008)
- (https://github.com/KoderLabs/ngx-device-detector/pull/57). Thanks to [sumitgupta0627](https://github.com/sumitgupta0627)

## 1.3.4
- Minor patches

## 1.3.3
- Minor patch for UC browser detection [#51](https://github.com/KoderLabs/ngx-device-detector/pull/51). Thanks to [Gailbear](https://github.com/Gailbear)

## 1.3.2
- Minor patch for edge version detection [#49](https://github.com/KoderLabs/ngx-device-detector/pull/49). Thanks to [pmcelreavy](https://github.com/pmcelreavy)

## 1.3.1
- Added better support for Android Browsers [#48](https://github.com/Koderlabs/ngx-device-detector/pulls/48). Thanks to [Gailbear](https://github.com/Gailbear)

## 1.3.0 **(contains breaking changes)**
- Added support for angular 6 [#37](https://github.com/KoderLabs/ngx-device-detector/issues/37)
- Drop support for angular 4

## 1.2.3
- Updated the readme for IE support

## 1.2.2 **(contains breaking changes)**
- Removing the SSR (Universal) support because of the raising issues.
- Will be revisiting SSR support properly in April.

## 1.2.1
- moved @angular/platform-server to peer-dependencies

## 1.2.0
- minor fixes
- fixed [#27](https://github.com/KoderLabs/ngx-device-detector/issues/27).

## 1.1.7
- minor fixes

## 1.1.6
- fixes. Readme Updated with Angular Universal dependency info

## 1.1.5
- fixes #22, #23

## 1.1.4
- fixes
- Support added for Angular Universal

## 1.1.3
- fixes

## 1.1.2
- fixes

## 1.1.1
- fixes

## 1.1.0 **(contains breaking changes)**

- Added official support to Angular5
- The package name has been changed to `ngx-device-detector`
- Renamed the Service from `Ng2DeviceService` to `DeviceDetectorService`
- Renamed the Module from `Ng2DeviceDetector` to `DeviceDetectorModule`

## 1.0.0 **(contains breaking changes)**

- Renamed the Service from `Device` to `Ng2DeviceService`
- Renamed the Module from `Ng2DeviceDetector` to `Ng2DeviceDetectorModule`
- Import has changed from `imports: [Ng2DeviceDetectorModule]` to `imports: [Ng2DeviceDetectorModule.forRoot()]`
