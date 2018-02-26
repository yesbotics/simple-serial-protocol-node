"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandMessage = (function () {
    function CommandMessage(raw) {
        this._raw = raw;
        var valuesStr = raw.substring(1, raw.length - 1);
        this._values = valuesStr.split(',');
    }
    Object.defineProperty(CommandMessage.prototype, "length", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    ;
    CommandMessage.prototype.getMessageString = function () {
        return this._raw;
    };
    CommandMessage.prototype.getStringValueAt = function (index) {
        return this._values[index];
    };
    ;
    CommandMessage.prototype.getIntValueAt = function (index) {
        return parseInt(this._values[index], 10);
    };
    ;
    CommandMessage.prototype.getFloatValueAt = function (index) {
        return parseFloat(this._values[index]);
    };
    ;
    CommandMessage.prototype.getBooleanValueAt = function (index) {
        return this._values[index] === 'true' || this._values[index] === '1' ? true : false;
    };
    ;
    return CommandMessage;
}());
exports.CommandMessage = CommandMessage;
