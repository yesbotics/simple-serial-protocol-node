# Simple Serial Protocol Dokus

## SSP Protocol docs

### Beschreibung des Ziels dieses Protokolls
* general purpose - define ur own ssp-based protocol
* event-based (callbacks)
* low bytes data transfer (based on fundamental c/c++ datatypes)
* robust (low memory-safe)

### Datentypen und Bereiche

* bool (8bit)

* char (8bit) Einzelne Zeichen
    * signed -128 to 127
    * unsigned 0 to 255

* int or short (16bit) (short kann raus oder?)
    * signed -32768 to 32767
    * unsigned 0 to 65523 

* long (32bit)
    * signed -2147483648 to 2147483647
    * unsigned 0 to 4294967295
    
* float (32bit)
    * ± 3.402,823,4 · 10^38

* string (variable länge)
    * pro ascii einzelzeichen 8bit
    * plus 8bit für end-of-string

### Inspired by Antonin Raffin's minmalistic primitive datentypes approach
* [simple-and-robust-computer-arduino-serial-communication](https://medium.com/@araffin/simple-and-robust-computer-arduino-serial-communication-f91b95596788)
* gitrepo [araffin/arduino-robust-serial](https://github.com/araffin/arduino-robust-serial)


## Node.js

### Beschreibung
serial communication between Node und Arduino (and compatible) devices
* keywords aus SSP-Protocol docs
* Verweis auf SSP-Protocol-docs

### Install
`npm install --save @yesbotics/simple-serial-protocol-node`
 
### usage (typescript) >>> ECHO-EXAMPLE >>> <lib root>/src/examples/echo-example.ts
this example sends two values to arduino and get this values sent back from arduino. look corresponding arduino side
```
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

```
bigger more detailed example <lib root>/src/examples/advanced-example.ts

## Arduino

### Beschreibung
serial communication between Node und Arduino (and compatible) devices
* keywords aus SSP-Protocol docs
* Verweis auf SSP-Protocol-docs

### install
copy from this repo or arduino library manager (muss noch in die arduino registry)

### usage  >>> ECHO-EXAMPLE >>> <lib root>/examples/echo_example/echo_example.ino
this example receives two values from PC-side and sends them back



