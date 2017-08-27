import * as SerialPort from 'serialport/lib';

export class SimpleSerialProtocol {

    private _serialPort: SerialPort = null;
    private _portname: String;
    private _baudrate: Number = 115200;

    constructor(portname, baudrate: Number = 115200) {
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, {baudRate: baudrate, autoOpen: false})
    }

    public start = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (this.isRunning) {
                reject(Error('SerialPort already connected'));
                return;
            }
            this._serialPort.open((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                //Some devices, like the Arduino, reset when you open a connection to them.
                // In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data.
                // This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing.
                // You can also often get away with waiting around 400ms.
                setTimeout(resolve, 3000);
            });
            this._serialPort.on('data', this.onData);
            // this._serialPort.on('readable', this.onReadable);
        });
    }

    public get isRunning(): Boolean {
        return this._serialPort.isOpen;
    }


    public send = (msg: string): void => {
        this._serialPort.write(msg);
    }

    private onData = (data: Buffer): void => {
        console.log('onData:', data.toString('ascii'));
    }
    private onReadable = (): void => {
        console.log('onReadable:', this._serialPort.read());
    }
}