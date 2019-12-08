// yo,

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
    stringValue1: string,
    stringValue2: string,
    stringValue3: string,
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
        stringValue1,
        stringValue2,
        stringValue3,
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
    ParamTypeString.NAME
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

            // For BigInt Support add `esnext` to your tsconfig lib section
            .addInt64Value(BigInt(-2147483648000999))
            .addUint64Value(BigInt(7294967295000999))

            .addFloatValue(-1.23456789101112)
            .addCharValue('J')

            .addStringValue("text1: Hey, I'm text one!")
            .addStringValue("text2: And I am his brother text two!")
            .addStringValue("text3: Nice!");

        arduino.writeCommand(command);
    });
