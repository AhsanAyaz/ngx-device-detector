"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is only for local test
 */
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_3 = require("@angular/core");
var dist_1 = require("../dist");
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, props) {
        if (props === void 0) { props = []; }
        var keys = [];
        var noFilter = props.length === 0;
        for (var key in value) {
            if (noFilter) {
                if (value.hasOwnProperty(key)) {
                    keys.push({ key: key, value: value[key] });
                }
            }
            else {
                if (props.indexOf(key) !== -1) {
                    keys.push({ key: key, value: value[key] });
                }
            }
        }
        return keys;
    };
    KeysPipe = __decorate([
        core_3.Pipe({
            name: 'keys'
        })
    ], KeysPipe);
    return KeysPipe;
}());
exports.KeysPipe = KeysPipe;
var AppComponent = (function () {
    function AppComponent(deviceService) {
        this.deviceService = deviceService;
        this.propsToShow = ["userAgent", "os", "browser", "device", "os_version", "browser_version"];
        this.device = null;
        this.device = deviceService.getDeviceInfo();
        console.log(this.device);
    }
    AppComponent = __decorate([
        core_2.Component({
            selector: 'app',
            template: "\n  <div id=\"demoApp\" class=\"container\">\n    <div class=\"demo-container\">\n      <div class=\"demo-heading\">\n        <h2 class=\"text-center demo-heading-text\">\n          ngx-device-detector demo\n        </h2>\n        <p class=\"text-center\">\n          Open this page from different devices to see the appropriate details\n        </p>\n        <h4 class=\"text-center\">Device Information</h4>\n      </div>\n      <div class=\"information-table\">\n        <table class=\"table table-hover\">\n          <tr>\n            <th>Property</th>\n            <th>Value</th>\n          </tr>\n          <tr *ngFor=\"let info of device | keys: propsToShow\" class=\"info-item w3-hover-blue\">\n            <td>{{info.key}}</td>\n            <td>{{info.value}}</td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </div>\n"
        }),
        __metadata("design:paramtypes", [dist_1.DeviceDetectorService])
    ], AppComponent);
    return AppComponent;
}());
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [AppComponent],
            declarations: [AppComponent, KeysPipe],
            imports: [platform_browser_1.BrowserModule, dist_1.DeviceDetectorModule.forRoot()]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=index.js.map