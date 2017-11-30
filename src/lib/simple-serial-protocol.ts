import * as SerialPort from 'serialport/lib';
import Dictionary from 'typescript-collections/dist/lib/Dictionary';
import {CommandMessage} from './command-message';

export class SimpleSerialProtocol {

    private _serialPort: SerialPort = null;
    private _portname: string;
    private _baudrate: number = 115200;
    private _registeredCommandCallbacks: Dictionary<string, Function> = new Dictionary();

    constructor(portname, baudrate: number = 115200) {
        this._portname = portname;
        this._baudrate = baudrate;
        this._serialPort = new SerialPort(this._portname, {baudRate: baudrate, autoOpen: false});
    }

    public start(): Promise<any> {
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
                // TODO: implement following "ready pattern" on Arduino side
                // Quote:
                // Some devices, like the Arduino, reset when you open a connection to them.
                // In such cases, immediately writing to the device will cause lost data as they wont be ready to receive the data.
                // This is often worked around by having the Arduino send a "ready" byte that your Node program waits for before writing.
                // You can also often get away with waiting around 400ms
                setTimeout(resolve, 400);
            });
            this._serialPort.on('data', this.onData);
        });
    }

    public get isRunning(): boolean {
        return this._serialPort.isOpen;
    }

    public send(msg: string): SimpleSerialProtocol {
        this._serialPort.write(msg, 'ascii');
        return this;
    }

    public registerCommand(char: string, callback: Function): SimpleSerialProtocol {
        this._registeredCommandCallbacks.setValue(char, callback);
        return this;
    }

    public unregisterCommand(char: string): SimpleSerialProtocol {
        this._registeredCommandCallbacks.remove(char);
        return this;
    }

    private onData(buf: Buffer): void {
        let msg: string = buf.toString('ascii');
        console.log('onData:', msg);
        let len = msg.length;
        let cmdBuf: string = '';
        for (let i = 0; i < len; i++) {
            let char = msg[i];
            cmdBuf += char;
            if (char === ';') {
                let commandChar: string = cmdBuf.charAt(0);
                this._registeredCommandCallbacks.getValue(commandChar).apply(null, [new CommandMessage(cmdBuf)]);
                cmdBuf = '';
            }
        }
    }
}
