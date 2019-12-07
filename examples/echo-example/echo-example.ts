import 'source-map-support/register';

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
    charArrayValue: string,
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
        charArrayValue,
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
        console.log('Send several values to Arduino');
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
