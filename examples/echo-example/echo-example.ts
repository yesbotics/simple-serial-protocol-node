import {
    SimpleSerialProtocol,
    ParamTypeCharArray,
    ParamTypeFloat,
    Baudrate,
    ParamTypeByte,
    ParamTypeBoolean,
    ParamTypeChar,
    ParamTypeInt16,
    ParamTypeInt32,
    ParamTypeInt8,
    ParamTypeUnsignedInt16,
    ParamTypeUnsignedInt32,
    ParamTypeUnsignedInt8
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
            {type: ParamTypeFloat.NAME, value: -3.12345},
            {type: ParamTypeChar.NAME, value: 'J'},
            {type: ParamTypeCharArray.NAME, value: "Hey, I'm a täxt!"},
        ]);
    });
