# Simple Serial Protocol for Node.js (TypeScript and ES6)
Easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.
Node.js implementation of our [Simple Serial Protocol]

## install
`npm install --save @yesbotics/simple-serial-protocol-node`
 
## example usage (TypeScript)
This example sends two values to Arduino and get same values sent back from Arduino.
The first value is an text of max 50 chars length (in this example. more is possible).
The second value is an floating point value. We have choosen 3.14159265359.
This example can be found as npm application in the `simple-serial-protocol-node/examples/echo-example` folder.
This example corresponds with the Arduino sketch at [Simple Serial Protocol for Arduino].

```typescript
import {SimpleSerialProtocol, ParamTypeCharArray, ParamTypeFloat, Baudrate} from '@yesbotics/simple-serial-protocol-node';

// define serial port identifier and baudrate
const portname: string = 'COM4';
const bautrate: Baudrate = 9600;

// create instance
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol(portname, bautrate);

// define command id, callback function and expected dataytpes
arduino.registerCommand('s', (someString: string, someFloatingPointValue: number) => {
    console.log('Received values from Arduino:');
    console.log('someString', someString);
    console.log('someFloatingPointValue', someFloatingPointValue);
}, [ParamTypeCharArray.NAME, ParamTypeFloat.NAME]);

// establish connection to arduino and wait 3 seconds
// give arduino time to start after getting connected (and resetted too)
arduino.init(3000).catch((err) => {
    console.error('Could not init connection. reason:', err);
}).then(() => {
    console.log('Arduino connected.');
    console.log('Now sending 2 values to Arduino');
    arduino.writeCommand('r', [
        // in this example text should not be longer than 50 chars (max length is defined in Arduiono sketch)
        {type: ParamTypeCharArray.NAME, value: 'hey i am a text'},
        {type: ParamTypeFloat.NAME, value: 3.14159265359}
    ]);
});
```

## links
[Simple Serial Protocol]:https://gitlab.com/yesbotics/simple-serial-protocol/simple-serial-protocol-docs
[Simple Serial Protocol for Arduino]:https://gitlab.com/yesbotics/simple-serial-protocol/simple-serial-protocol-arduino

