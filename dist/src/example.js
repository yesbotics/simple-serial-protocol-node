"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_serial_protocol_1 = require("./lib/simple-serial-protocol");
var Example = (function () {
    function Example() {
        var _this = this;
        this.run = function () {
            var ssp = new simple_serial_protocol_1.SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
            ssp.registerCommand('b', _this.onCommandB);
            ssp.registerCommand('c', _this.onCommandC);
            ssp.start().then(function () {
                console.log('arduino is ready. now sending command "a;"');
                ssp.send('a;');
            }).catch(function (err) {
                throw err;
            });
        };
    }
    Example.prototype.onCommandB = function (cmdMsg) {
        console.log('onCommandB', cmdMsg);
    };
    Example.prototype.onCommandC = function (cmdMsg) {
        console.log('onCommandC', cmdMsg);
    };
    Example.PORTNAME = 'COM3';
    Example.BAUDRATE = 115200;
    return Example;
}());
var example = new Example();
example.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQWtFO0FBRWxFO0lBQUE7UUFBQSxpQkF1QkM7UUFuQlUsUUFBRyxHQUFHO1lBQ1QsSUFBSSxHQUFHLEdBQXlCLElBQUksNkNBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0YsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztnQkFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNULE1BQU0sR0FBRyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFTTixDQUFDO0lBUFcsNEJBQVUsR0FBbEIsVUFBbUIsTUFBYztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sNEJBQVUsR0FBbEIsVUFBbUIsTUFBYztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBckJzQixnQkFBUSxHQUFXLE1BQU0sQ0FBQztJQUMxQixnQkFBUSxHQUFXLE1BQU0sQ0FBQztJQXFCckQsY0FBQztDQUFBLEFBdkJELElBdUJDO0FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUM1QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMifQ==