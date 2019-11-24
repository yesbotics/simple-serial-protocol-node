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

// establish connection to arduino and wait two seconds
// (arduino needs time to start after connect)
arduino.init(2000).catch((err) => {
    console.error('could not minit connection', err)
}).then(() => {
    console.log('Arduino connected. Sending two values to Arduino');
    arduino.writeCommand('s', [
        {type: ParamTypeCharArray.NAME, value: 'hey i\'m a text'},
        {type: ParamTypeFloat.NAME, value: 3.14}
    ]);
});
