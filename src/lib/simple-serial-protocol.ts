import * as SerialPort from 'serialport/lib';

export class SimpleSerialProtocol {

    private _serialPort: SerialPort = null;
    private _portname: String;
    private _baudrate: Number = 115200;

    constructor(portname, baudrate: Number = 115200) {
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, {autoOpen: false})
    }

    public start = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (this.isRunning) {
                reject(Error('SerialPort already opened'));
                return;
            }
            this._serialPort.open((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
            // this._serialPort.on('data', (data) => {
            //     console.log('Data:', data);
            // });
            this._serialPort.on('readable', () => {
                console.log('Data:', this._serialPort.read().readline());
            });
        });
    }

    public get isRunning(): Boolean {
        return this._serialPort.isOpen;
    }


    public send=(msg: string):void=> {
        this._serialPort.write(msg);
    }
}