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
    console.log('Arduino connected.');
    console.log('Now sending 2 values to Arduino');
    arduino.writeCommand('s', [
        // in this example text should not be longer than 50 chars (max length is defined in Arduiono sketch)
        {type: ParamTypeCharArray.NAME, value: 'hey i\'m a text'},
        {type: ParamTypeFloat.NAME, value: 3.14159265359}
    ]);
});
