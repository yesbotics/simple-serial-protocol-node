# Simple Serial Protocol for Node.js (TypeScript and ES6)

## description
Easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.

Node.js implementation of our [Simple Serial Protocol](https://gitlab.com/yesbotics/simple-serial-protocol-docs)

## install
`npm install --save @yesbotics/simple-serial-protocol-node`
 
## typescript example usage
This example sends two values to Arduino and get same values sent back from Arduino.
The first value is an text of max 50 chars length (in this example. more is possible).
The second value is an floating point value. We have choosen 3.14159265359.
This example can be found as npm application in the `./examples/echo-example` folder.
This example corresponds with the Arduino sketch inside the folder `<arduino-lib-folder>/examples/echo_example` of 
[Simple Serial Protocol for Arduino](https://gitlab.com/yesbotics/simple-serial-protocol/simple-serial-protocol-arduino) .
```
import {SimpleSerialProtocol, ParamTypeCharArray, ParamTypeFloat, Baudrate} from '@yesbotics/simple-serial-protocol-node';

//defining serial port identifier and baudrate
const portname: string = 'COM4';
const bautrate: Baudrate = 9600;

// create instance
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol(portname, bautrate);

// define command id, callback function and expected dataytpes
arduino.registerCommand('r', (someString: string, someFloatingPointValue: number) => {
    console.log('Received values from Arduino:');
    console.log('someString', someString);
    console.log('someFloatingPointValue', someFloatingPointValue);
}, [ParamTypeCharArray.NAME, ParamTypeFloat.NAME]);

// establish connection to arduino and wait 2 seconds
// give arduino time to start after getting connected (and resetted too)
arduino.init(2000).catch((err) => {
    console.error('Could not init connection. reason:', err);
}).then(() => {
    console.log('Arduino connected. Sending 2 values to Arduino');
    arduino.writeCommand('s', [
        // in this example text should not be longer than 50 chars (max length is defined in Arduiono sketch)
        {type: ParamTypeCharArray.NAME, value: 'hey i\'m a text'},
        {type: ParamTypeFloat.NAME, value: 3.14159265359}
    ]);
});
```

## TODO: more examples:
hier kommt kappaj's extrakt rein (aus der `README.md.old`)



