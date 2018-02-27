"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_serial_protocol_1 = require("./lib/simple-serial-protocol");
var Example = (function () {
    function Example() {
    }
    Example.prototype.run = function () {
        var ssp = new simple_serial_protocol_1.SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.registerCommand('b', this.onCommandB);
        ssp.registerCommand('c', this.onCommandC);
        ssp.start().then(function () {
            console.log('arduino is ready. now sending command "a;"');
            ssp.send('a;');
        }).catch(function (err) {
            throw err;
        });
    };
    ;
    Example.prototype.onCommandB = function (cmdMsg) {
        console.log('onCommandB', cmdMsg.getMessageString());
    };
    Example.prototype.onCommandC = function (cmdMsg) {
        console.log('onCommandC', cmdMsg.getMessageString());
    };
    Example.PORTNAME = 'COM3';
    Example.BAUDRATE = 115200;
    return Example;
}());
var example = new Example();
example.run();
