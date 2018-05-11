import * as SerialPort from 'serialport';

import Dictionary from 'typescript-collections/dist/lib/Dictionary';

import {CommandMessage} from './command-message';

export class SimpleSerialProtocol {

    private _serialPort: SerialPort = null;
    private _portname: string;
    private _baudrate: number = 115200;
    private _registeredCommandCallbacks: Dictionary<string, Function> = new Dictionary();
    private _running: boolean = false;
    private _currentBuffer: string = '';
    private _readyTimeout: number;

    constructor(portname: string, baudrate: number = 115200, readyTimeout: number = 1000) {
        this._readyTimeout = readyTimeout;
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
                // You can also often get away with waiting around 400ms.
                setTimeout(resolve, this._readyTimeout);
                this._running = true;
            });
            this._serialPort.on('data', this.onData.bind(this));
        });
    };


    public getPortname(): string {
        return this._portname;
    }

    public getBaudrate(): number {
        return this._baudrate;
    }

    public dispose(callback?: (error: Error) => void): void {
        this._registeredCommandCallbacks.clear();
        return this._serialPort.close(callback);
    }

    public get isRunning(): boolean {
        return this._running;
        // return this._serialPort.isOpen();
    }

    public send(msg: string): SimpleSerialProtocol {
        this._serialPort.write(msg);
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
        // console.log('onData:', msg);
        let len = msg.length;
        for (let i = 0; i < len; i++) {
            let char = msg[i];
            this._currentBuffer += char;
            if (char === ';') {
                let commandChar: string = this._currentBuffer.charAt(0);
                let commandFunc = this._registeredCommandCallbacks.getValue(commandChar);
                if (commandFunc) {
                    commandFunc.apply(null, [new CommandMessage(this._currentBuffer)]);
                } else {
                    console.error('Could not find callback for command "' + commandChar + '", message: ' + this._currentBuffer);
                }
                this._currentBuffer = '';
            }
        }
    }
}
