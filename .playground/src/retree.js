"use strict";
/**
 * Created by ahsanayaz on 08/11/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ReTree = /** @class */ (function () {
    function ReTree() {
    }
    ReTree.prototype.test = function (string, regex) {
        var self = this;
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }
        if (regex instanceof RegExp) {
            return regex.test(string);
        }
        else if (regex && Array.isArray(regex.and)) {
            return regex.and.every(function (item) {
                return self.test(string, item);
            });
        }
        else if (regex && Array.isArray(regex.or)) {
            return regex.or.some(function (item) {
                return self.test(string, item);
            });
        }
        else if (regex && regex.not) {
            return !self.test(string, regex.not);
        }
        else {
            return false;
        }
    };
    ReTree.prototype.exec = function (string, regex) {
        var self = this;
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }
        if (regex instanceof RegExp) {
            return regex.exec(string);
        }
        else if (regex && Array.isArray(regex)) {
            return regex.reduce(function (res, item) {
                return !!res ? res : self.exec(string, item);
            }, null);
        }
        else {
            return null;
        }
    };
    return ReTree;
}());
exports.ReTree = ReTree;
//# sourceMappingURL=retree.js.map