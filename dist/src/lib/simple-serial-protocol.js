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
                    reject(Error('SerialPort already opened'));
                    return;
                }
                _this._serialPort.open(function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
                // this._serialPort.on('data', (data) => {
                //     console.log('Data:', data);
                // });
                _this._serialPort.on('readable', function () {
                    console.log('Data:', _this._serialPort.read().readline());
                });
            });
        };
        this.send = function (msg) {
            _this._serialPort.write(msg);
        };
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, { autoOpen: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlcmlhbC1wcm90b2NvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2ltcGxlLXNlcmlhbC1wcm90b2NvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE2QztBQUU3QztJQU1JLDhCQUFZLFFBQVEsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGlCQUF5QjtRQUEvQyxpQkFJQztRQVJPLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBRS9CLGNBQVMsR0FBVyxNQUFNLENBQUM7UUFRNUIsVUFBSyxHQUFHO1lBQ1gsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO29CQUN0QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDWixNQUFNLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztnQkFDSCwwQ0FBMEM7Z0JBQzFDLGtDQUFrQztnQkFDbEMsTUFBTTtnQkFDTixLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDN0QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQU9NLFNBQUksR0FBQyxVQUFDLEdBQVc7WUFDcEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBbENHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUF3QkQsc0JBQVcsMkNBQVM7YUFBcEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFNTCwyQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksb0RBQW9CIn0=