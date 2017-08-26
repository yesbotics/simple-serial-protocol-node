"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_serial_protocol_1 = require("./lib/simple-serial-protocol");
var Example = (function () {
    function Example() {
        this.run = function () {
            var ssp = new simple_serial_protocol_1.SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
            ssp.start().then(function () {
                setTimeout(function () {
                    console.log('ddmmm');
                    // ssp.send('a;');
                }, 1000);
            }).catch(function (err) {
                throw err;
            });
        };
    }
    Example.PORTNAME = 'COM4';
    Example.BAUDRATE = 115200;
    return Example;
}());
var example = new Example();
example.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQWtFO0FBRWxFO0lBQUE7UUFJVyxRQUFHLEdBQUc7WUFDVCxJQUFJLEdBQUcsR0FBeUIsSUFBSSw2Q0FBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNiLFVBQVUsQ0FBQztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQixrQkFBa0I7Z0JBQ3RCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7Z0JBQ1QsTUFBTSxHQUFHLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztJQUNOLENBQUM7SUFkMEIsZ0JBQVEsR0FBVyxNQUFNLENBQUM7SUFDMUIsZ0JBQVEsR0FBVyxNQUFNLENBQUM7SUFhckQsY0FBQztDQUFBLEFBZkQsSUFlQztBQUVELElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDNUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDIn0=