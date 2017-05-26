"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent(deviceService) {
        this.deviceService = deviceService;
        this.propsToShow = ["userAgent", "os", "browser", "device", "os_version", "browser_version"];
        this.device = null;
        this.device = deviceService.getDeviceInfo();
        console.log(this.device);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'ng2-dd-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
exports.AppComponent = AppComponent;
