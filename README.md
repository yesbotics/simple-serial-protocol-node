# Simple Serial Protocol for Node.js (TypeScript and ES6)
Provides easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.
This package covers the Node.js implementation of [Simple Serial Protocol].

## NPM registry
This package is distributed as [simple-serial-protocol-node npm package].

## Install
`npm install --save @yesbotics/simple-serial-protocol-node`
 
## Usage example (echo-example written in TypeScript)
This example sends two values to Arduino and get same values immediately sent back from Arduino.
The first value is an text of maximum 49 chars length (in this example only - more is possible).
The second value is an floating point value.
This example can be found as npm application in the `simple-serial-protocol-node/examples/echo-example` folder.
It corresponds with the Arduino sketch at [Simple Serial Protocol for Arduino].

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
arduino.init(3000)
    .catch((err) => {
        console.error('Could not init connection. reason:', err);
    })
    .then(() => {
        console.log('Arduino connected.');
        console.log('Now sending 2 values to Arduino');
        arduino.writeCommand('r', [
            // in this example text should not be longer than 49 chars (max length is defined in Arduiono sketch)
            {type: ParamTypeCharArray.NAME, value: 'hey i am a text'},
            {type: ParamTypeFloat.NAME, value: 3.14159265359}
        ]);
    });
```

## More Arduino examples

You can find more arduino examples in the `simple-serial-protocol-node/arduino/` folder. All arduino examples can be built
with the [Arduino IDE] or [Arduino-CLI]. These examples correspond to the `simple-serial-protocol-node/src/example.ts`.

You need the Arduino library [IntervalCallback] to build the examples.

## Links
[Simple Serial Protocol]:https://gitlab.com/yesbotics/simple-serial-protocol/simple-serial-protocol-docs
[simple-serial-protocol-node npm package]:https://www.npmjs.com/package/@yesbotics/simple-serial-protocol-node
[Simple Serial Protocol for Arduino]:https://gitlab.com/yesbotics/simple-serial-protocol/simple-serial-protocol-arduino
[Arduino IDE]:https://www.arduino.cc/en/main/software
[Arduino-CLI]:https://github.com/arduino/arduino-cli
[IntervalCallback]:https://gitlab.com/yesbotics/libs/arduino/interval-callback