# Simple Serial Protocol for Node.js (TypeScript and ES6)
Provides easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.
This package covers the Node.js implementation of [Simple Serial Protocol].

## NPM registry
This package is distributed as [simple-serial-protocol-node npm package].

## Install
`npm install --save @yesbotics/simple-serial-protocol-node`

## Requirements
* Node.js >= 10.4.0 
 
## Usage example (echo-example written in TypeScript)
This example sends two values to Arduino and get same values immediately sent back from Arduino.
The first value is an text of maximum 49 chars length (in this example only - more is possible).
The second value is an floating point value.
This example can be found as npm application in the `simple-serial-protocol-node/examples/echo-example` folder.
It corresponds with the Arduino sketch at [Simple Serial Protocol for Arduino].

```typescript
import {
    SimpleSerialProtocol,
    ParamTypeCharArray,
    ParamTypeFloat,
    Baudrate,
    ParamTypeByte,
    ParamTypeBoolean,
    ParamTypeChar,
    ParamTypeInt8,
    ParamTypeInt16,
    ParamTypeInt32,
    ParamTypeInt64,
    ParamTypeUnsignedInt8,
    ParamTypeUnsignedInt16,
    ParamTypeUnsignedInt32,
    ParamTypeUnsignedInt64
} from '@yesbotics/simple-serial-protocol-node';

// define serial port identifier and baudrate
const portname: string = 'COM5';
const bautrate: Baudrate = 9600;

// create instance
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol(portname, bautrate);

// define command id, callback function and expected dataytpes
arduino.registerCommand('s', (
    byte: number,
    boolean: boolean,
    int8: number,
    uint8: number,
    int16: number,
    uint16: number,
    int32: number,
    uint32: number,
    int64: bigint,
    uint64: bigint,
    float: number,
    char: string,
    charArray: string,
) => {
    console.log('Received values from Arduino:',
        byte,
        boolean,
        int8,
        uint8,
        int16,
        uint16,
        int32,
        uint32,
        int64,
        uint64,
        float,
        char,
        charArray,
    );
}, [
    ParamTypeByte.NAME,
    ParamTypeBoolean.NAME,
    ParamTypeInt8.NAME,
    ParamTypeUnsignedInt8.NAME,
    ParamTypeInt16.NAME,
    ParamTypeUnsignedInt16.NAME,
    ParamTypeInt32.NAME,
    ParamTypeUnsignedInt32.NAME,
    ParamTypeInt64.NAME,
    ParamTypeUnsignedInt64.NAME,
    ParamTypeFloat.NAME,
    ParamTypeChar.NAME,
    ParamTypeCharArray.NAME,
]);

// establish connection to arduino and wait 3 seconds
// give arduino time to start after getting connected (and resetted too)
arduino.init(3000)
    .catch((err) => {
        console.error('Could not init connection. reason:', err);
    })
    .then(() => {
        console.log('Arduino connected.');

        arduino.writeCommand('r', [
            // in this example text should not be longer than 49 chars (max length is defined in Arduiono sketch)
            {type: ParamTypeByte.NAME, value: 0xff},
            {type: ParamTypeBoolean.NAME, value: true},
            {type: ParamTypeInt8.NAME, value: -128},
            {type: ParamTypeUnsignedInt8.NAME, value: 255},
            {type: ParamTypeInt16.NAME, value: -32768},
            {type: ParamTypeUnsignedInt16.NAME, value: 65523},
            {type: ParamTypeInt32.NAME, value: -2147483648},
            {type: ParamTypeUnsignedInt32.NAME, value: 4294967295},
            {type: ParamTypeInt64.NAME, value: BigInt(-2147483648000)},
            {type: ParamTypeUnsignedInt64.NAME, value: BigInt(4294967295000)},
            {type: ParamTypeFloat.NAME, value: -3.12345},
            {type: ParamTypeChar.NAME, value: 'J'},
            {type: ParamTypeCharArray.NAME, value: "Hey, I'm a täxt!"},
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
