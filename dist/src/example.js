"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_serial_protocol_1 = require("./lib/simple-serial-protocol");
var Example = (function () {
    function Example() {
        this.run = function () {
            var ssp = new simple_serial_protocol_1.SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
            ssp.start().then(function () {
                console.log('arduino is ready');
                ssp.send('a;');
            }).catch(function (err) {
                throw err;
            });
        };
    }
    Example.PORTNAME = 'COM3';
    Example.BAUDRATE = 115200;
    return Example;
}());
var example = new Example();
example.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQWtFO0FBRWxFO0lBQUE7UUFJVyxRQUFHLEdBQUc7WUFDVCxJQUFJLEdBQUcsR0FBeUIsSUFBSSw2Q0FBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNULE1BQU0sR0FBRyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFDTixDQUFDO0lBWjBCLGdCQUFRLEdBQVcsTUFBTSxDQUFDO0lBQzFCLGdCQUFRLEdBQVcsTUFBTSxDQUFDO0lBV3JELGNBQUM7Q0FBQSxBQWJELElBYUM7QUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQzVCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyJ9