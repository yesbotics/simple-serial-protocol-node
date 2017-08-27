"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport/lib");
var SimpleSerialProtocol = (function () {
    function SimpleSerialProtocol(portname, baudrate) {
        if (baudrate === void 0) { baudrate = 115200; }
        var _this = this;
        this._serialPort = null;
        this._baudrate = 115200;
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
                    setTimeout(resolve, 3000);
                });
                _this._serialPort.on('data', _this.onData);
                // this._serialPort.on('readable', this.onReadable);
            });
        };
        this.send = function (msg) {
            _this._serialPort.write(msg);
        };
        this.onData = function (data) {
            console.log('onData:', data.toString('ascii'));
        };
        this.onReadable = function () {
            console.log('onReadable:', _this._serialPort.read());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlcmlhbC1wcm90b2NvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2ltcGxlLXNlcmlhbC1wcm90b2NvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2QztBQUU3QztJQU1JLDhCQUFZLFFBQVEsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGlCQUF5QjtRQUEvQyxpQkFJQztRQVJPLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBRS9CLGNBQVMsR0FBVyxNQUFNLENBQUM7UUFRNUIsVUFBSyxHQUFHO1lBQ1gsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO29CQUN0QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDWixNQUFNLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCwyRUFBMkU7b0JBQzNFLG1IQUFtSDtvQkFDbkgseUhBQXlIO29CQUN6SCx5REFBeUQ7b0JBQ3pELFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLG9EQUFvRDtZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQU9NLFNBQUksR0FBRyxVQUFDLEdBQVc7WUFDdEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBRU8sV0FBTSxHQUFHLFVBQUMsSUFBWTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFBO1FBQ08sZUFBVSxHQUFHO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUE7UUF6Q0csSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtJQUM1RixDQUFDO0lBd0JELHNCQUFXLDJDQUFTO2FBQXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBYUwsMkJBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLG9EQUFvQiJ9