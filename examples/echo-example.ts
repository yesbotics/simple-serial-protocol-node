import {SimpleSerialProtocol, ParamTypeCharArray, ParamTypeFloat} from '@yesbotics/simple-serial-protocol-node';

// create instance and defining comport identifier and baudrate
const arduino: SimpleSerialProtocol = new SimpleSerialProtocol('COM4', 9600);

// define command id, callback function and expected dataytpes
arduino.registerCommand('r', (someString: string, someFloatingPointValue: number) => {
    console.log('received values from arduino:');
    console.log('someString', someString);
    console.log('someFloatingPointValue', someFloatingPointValue);
}, [ParamTypeCharArray.NAME, ParamTypeFloat.NAME]);

// establish connection to arduino and wait two seconds
// (arduino needs time to start after connect)
arduino.init(2000).catch(console.error).then(() => {
    console.log('arduino connected. Sending two values to arduino');
    arduino.writeCommand('s', [
        {type: ParamTypeCharArray.NAME, value: 'hey i\'m a text'},
        {type: ParamTypeFloat.NAME, value: 3.14}
    ]);
});
