# Simple Serial Protocol for Node.js (TypeScript and ES6)
Provides easy and robust general purpose serial communication between Node.js and Arduino(-compatible) devices.
This package covers the Node.js implementation of [Simple Serial Protocol].

## NPM registry
This package is distributed as [simple-serial-protocol-node npm package].

## Install
`npm install --save @yesbotics/simple-serial-protocol-node`

## Requirements
* Node.js >= 12.0.0 
 
## Usage example (echo-example written in TypeScript)
This example sends two values to Arduino and get same values immediately sent back from Arduino.
The first value is an text of maximum 49 chars length (in this example only - more is possible).
The second value is an floating point value.
This example can be found as npm application in the `simple-serial-protocol-node/examples/echo-example` folder.
It corresponds with the Arduino sketch at [Simple Serial Protocol for Arduino].

```typescript
import 'source-map-support/register';

import {
    Command,
    SimpleSerialProtocol,
    ParamTypeString,
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
const baudrate: Baudrate = 9600;

// create instance
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol(portname, baudrate);

// define command id, callback function and expected dataytpes
arduino.registerCommand('s', (
    byteValue: number,
    booleanValue: boolean,
    int8Value: number,
    uint8Value: number,
    int16Value: number,
    uint16Value: number,
    int32Value: number,
    uint32Value: number,
    int64Value: bigint,
    uint64Value: bigint,
    floatValue: number,
    charValue: string,
    stringValue0: string,
    stringValue1: string,
) => {
    console.log('Received several values from Arduino:',
        byteValue,
        booleanValue,
        int8Value,
        uint8Value,
        int16Value,
        uint16Value,
        int32Value,
        uint32Value,
        int64Value,
        uint64Value,
        floatValue,
        charValue,
        stringValue0,
        stringValue1,
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
    ParamTypeString.NAME,
    ParamTypeString.NAME,
]);

// establish connection to arduino and wait 2 seconds
// give arduino time to start after getting connected (and resetted too)
arduino.init(2000)
    .catch((err) => {
        console.error('Could not init connection. reason:', err);
    })
    .then(() => {
        console.log('Arduino connected.');
        console.log('Send several values to Arduino');

        const command: Command = new Command('r');
        command
            .addByteValue(0xff)
            .addBooleanValue(true)
            .addInt8Value(-128)
            .addUint8Value(255)
            .addInt16Value(-32768)
            .addUint16Value(65523)
            .addInt32Value(-2147483648)
            .addUint32Value(4294967295)
            .addInt64Value(BigInt(-2147483648000999))
            .addUint64Value(BigInt(4294967295000999))
            .addFloatValue(-3.12345)
            .addCharValue('J')
            .addStringValue("Hey, I'm text one!")
            .addStringValue("And I am his brother text two!");

        arduino.writeCommand(command);
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
