"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport/lib");
var Dictionary_1 = require("typescript-collections/dist/lib/Dictionary");
var SimpleSerialProtocol = (function () {
    function SimpleSerialProtocol(portname, baudrate) {
        if (baudrate === void 0) { baudrate = 115200; }
        var _this = this;
        this._serialPort = null;
        this._baudrate = 115200;
        this._registeredCommandCallbacks = new Dictionary_1.default();
        this.start = function () {
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
                    //Some devices, like the Arduino, reset when you open a connection to them.
                    // In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data.
                    // This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing.
                    // You can also often get away with waiting around 400ms.
                    setTimeout(resolve, 1000);
                });
                _this._serialPort.on('data', _this.onData);
            });
        };
        this.send = function (msg) {
            _this._serialPort.write(msg, 'ascii');
            return _this;
        };
        this.registerCommand = function (char, callback) {
            _this._registeredCommandCallbacks.setValue(char, callback);
            return _this;
        };
        this.unregisterCommand = function (char) {
            _this._registeredCommandCallbacks.remove(char);
            return _this;
        };
        this.onData = function (buf) {
            var msg = buf.toString('ascii');
            console.log('onData:', msg);
            var len = msg.length;
            var cmdBuf = '';
            for (var i = 0; i < len; i++) {
                var char = msg[i];
                cmdBuf += char;
                if (char === ';') {
                    var commandChar = cmdBuf.charAt(0);
                    _this._registeredCommandCallbacks.getValue(commandChar).apply(null, [cmdBuf]);
                    cmdBuf = '';
                }
            }
        };
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, { baudRate: baudrate, autoOpen: false });
    }
    Object.defineProperty(SimpleSerialProtocol.prototype, "isRunning", {
        get: function () {
            return this._serialPort.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    return SimpleSerialProtocol;
}());
exports.SimpleSerialProtocol = SimpleSerialProtocol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlcmlhbC1wcm90b2NvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2ltcGxlLXNlcmlhbC1wcm90b2NvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2QztBQUM3Qyx5RUFBb0U7QUFFcEU7SUFPSSw4QkFBWSxRQUFRLEVBQUUsUUFBeUI7UUFBekIseUJBQUEsRUFBQSxpQkFBeUI7UUFBL0MsaUJBSUM7UUFUTyxnQkFBVyxHQUFlLElBQUksQ0FBQztRQUUvQixjQUFTLEdBQVcsTUFBTSxDQUFDO1FBQzNCLGdDQUEyQixHQUFpQyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQVE5RSxVQUFLLEdBQUc7WUFDWCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNaLE1BQU0sQ0FBQztvQkFDWCxDQUFDO29CQUNELDJFQUEyRTtvQkFDM0UsbUhBQW1IO29CQUNuSCx5SEFBeUg7b0JBQ3pILHlEQUF5RDtvQkFDekQsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQU1NLFNBQUksR0FBRyxVQUFDLEdBQVc7WUFDdEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUssb0JBQWUsR0FBRyxVQUFDLElBQVksRUFBRSxRQUFpQjtZQUNyRCxLQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsS0FBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVLLHNCQUFpQixHQUFHLFVBQUMsSUFBWTtZQUNwQyxLQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxLQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRU0sV0FBTSxHQUFHLFVBQUMsR0FBVztZQUN6QixJQUFJLEdBQUcsR0FBVyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDckIsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzNCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxJQUFJLElBQUksQ0FBQztnQkFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDZixJQUFJLFdBQVcsR0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxLQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxNQUFNLEdBQUMsRUFBRSxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBM0RHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7SUFDNUYsQ0FBQztJQXVCRCxzQkFBVywyQ0FBUzthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQWdDTCwyQkFBQztBQUFELENBQUMsQUFwRUQsSUFvRUM7QUFwRVksb0RBQW9CIn0=