# Simple Serial Protocol for Node.js (TypeScript and ES6)

## description
Easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.

Node.js implementation of our [Simple Serial Protocol](https://gitlab.com/yesbotics/simple-serial-protocol-docs)

## install
`npm install --save @yesbotics/simple-serial-protocol-node`
 
## typescript example usage
This example sends two values to Arduino and get same values sent back from Arduino.
This example can be found as running npm application in the `./examples/echo-example` folder.
It corresponds with the Arduino sketch echo example sketch in the Arduino implementation **LINK**
```
import {SimpleSerialProtocol, ParamTypeCharArray, ParamTypeFloat, Baudrate} from '@yesbotics/simple-serial-protocol-node';

//defining serial port identifier and baudrate
const portname: string = 'COM4';
const bautrate: Baudrate = 9600;

// create instance
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol(portname, bautrate);

// define command char, callback function and expected dataytpes
arduino.registerCommand('r', (someString: string, someFloatingPointValue: number) => {
    console.log('Received values from Arduino:');
    console.log('someString', someString);
    console.log('someFloatingPointValue', someFloatingPointValue);
}, [ParamTypeCharArray.NAME, ParamTypeFloat.NAME]);

// establish connection to arduino and wait two seconds
// give arduino time to start after getting connected (resetted), so we've choosen convenient 2 seconds
arduino.init(2000).catch((err) => {
    console.error('could not minit connection', err)
}).then(() => {
    console.log('Arduino connected. Sending two values to Arduino');
    arduino.writeCommand('s', [
        {type: ParamTypeCharArray.NAME, value: 'hey i\'m a text'},
        {type: ParamTypeFloat.NAME, value: 3.14}
    ]);
});
```

## TODO: more examples:
hier kommt kappaj's extrakt rein (aus der `README.md.old`)



