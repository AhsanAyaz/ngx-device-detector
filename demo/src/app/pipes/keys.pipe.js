"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
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
    return KeysPipe;
}());
KeysPipe = __decorate([
    core_1.Pipe({
        name: 'keys'
    })
], KeysPipe);
exports.KeysPipe = KeysPipe;
