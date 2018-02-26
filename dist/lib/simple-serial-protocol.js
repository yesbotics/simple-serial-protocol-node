"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("typescript-collections/dist/lib/Dictionary");
var command_message_1 = require("./command-message");
var SerialPort = require("serialport");
var SimpleSerialProtocol = (function () {
    function SimpleSerialProtocol(portname, baudrate) {
        if (baudrate === void 0) { baudrate = 115200; }
        this._serialPort = null;
        this._baudrate = 115200;
        this._registeredCommandCallbacks = new Dictionary_1.default();
        this._running = false;
        this._currentBuffer = "";
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, { baudRate: baudrate, autoOpen: false });
    }
    SimpleSerialProtocol.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isRunning) {
                reject(Error('SerialPort already connected'));
                return;
            }
            _this._serialPort.open(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                // TODO: implement following "ready pattern" on Arduino side
                // Quote:
                // Some devices, like the Arduino, reset when you open a connection to them.
                // In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data.
                // This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing.
                // You can also often get away with waiting around 400ms.
                setTimeout(resolve, 1000);
                _this._running = true;
            });
            _this._serialPort.on('data', _this.onData);
        });
    };
    ;
    SimpleSerialProtocol.prototype.dispose = function (callback) {
        this._registeredCommandCallbacks.clear();
        return this._serialPort.close(callback);
    };
    Object.defineProperty(SimpleSerialProtocol.prototype, "isRunning", {
        get: function () {
            return this._running;
            // return this._serialPort.isOpen();
        },
        enumerable: true,
        configurable: true
    });
    SimpleSerialProtocol.prototype.send = function (msg) {
        //TODO: Check this
        //second arg is not correct my idea says
        // this._serialPort.write(msg, 'ascii');
        this._serialPort.write(msg);
        return this;
    };
    SimpleSerialProtocol.prototype.registerCommand = function (char, callback) {
        this._registeredCommandCallbacks.setValue(char, callback);
        return this;
    };
    SimpleSerialProtocol.prototype.unregisterCommand = function (char) {
        this._registeredCommandCallbacks.remove(char);
        return this;
    };
    SimpleSerialProtocol.prototype.onData = function (buf) {
        var msg = buf.toString('ascii');
        // console.log('onData:', msg);
        var len = msg.length;
        for (var i = 0; i < len; i++) {
            var char = msg[i];
            this._currentBuffer += char;
            if (char === ';') {
                var commandChar = this._currentBuffer.charAt(0);
                var commandFunc = this._registeredCommandCallbacks.getValue(commandChar);
                if (commandFunc) {
                    commandFunc.apply(null, [new command_message_1.CommandMessage(this._currentBuffer)]);
                }
                else {
                    console.error('Could not find callback for command "' + commandChar + '"');
                }
                this._currentBuffer = "";
            }
        }
    };
    return SimpleSerialProtocol;
}());
exports.SimpleSerialProtocol = SimpleSerialProtocol;
