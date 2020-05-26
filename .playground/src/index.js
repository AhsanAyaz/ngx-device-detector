"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var device_detector_service_1 = require("./device-detector.service");
var DeviceDetectorModule = /** @class */ (function () {
    function DeviceDetectorModule() {
    }
    DeviceDetectorModule_1 = DeviceDetectorModule;
    DeviceDetectorModule.forRoot = function () {
        return {
            ngModule: DeviceDetectorModule_1,
            providers: [device_detector_service_1.DeviceDetectorService],
        };
    };
    var DeviceDetectorModule_1;
    DeviceDetectorModule = DeviceDetectorModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
        })
    ], DeviceDetectorModule);
    return DeviceDetectorModule;
}());
exports.DeviceDetectorModule = DeviceDetectorModule;
var device_detector_service_2 = require("./device-detector.service");
exports.DeviceDetectorService = device_detector_service_2.DeviceDetectorService;
var retree_1 = require("./retree");
exports.ReTree = retree_1.ReTree;
__export(require("./device-detector.constants"));
//# sourceMappingURL=index.js.map