import * as SerialPort from 'serialport';

import Dictionary from 'typescript-collections/dist/lib/Dictionary';

import {CommandMessage} from './command-message';
import {SimpleSerialProtocolError} from "./simple-serial-protocol-error";

export class SimpleSerialProtocol {

    public static readonly ERROR: string = '!';
    public static readonly DELIMITER: string = ',';
    public static readonly END: string = ';';

    public static readonly ERROR_NUM_MESSAGE_INCOMPLETE: number = 1;
    public static readonly ERROR_NUM_INVALID_COMMAND: number = 2;
    public static readonly ERROR_NUM_UNREGISTERED_COMMAND: number = 3;
    public static readonly ERROR_NUM_INVALID_ARGUMENTS_COUNT: number = 4;

    private _serialPort: SerialPort = null;
    private _portname: string;
    private _baudrate: number = 115200;
    private _registeredCommandCallbacks: Dictionary<string, Function> = new Dictionary();
    private _running: boolean = false;
    private _currentBuffer: string = '';
    private _readyTimeout: number;
    private _maxBufferSize: number;
    private _onErrorCallback: (error: SimpleSerialProtocolError) => void;

    constructor(portname: string, baudrate: number = 115200, readyTimeout: number = 1000, maxBufferSize: number = 100) {
        this._readyTimeout = readyTimeout;
        this._portname = portname;
        this._baudrate = baudrate;
        this._maxBufferSize = maxBufferSize;
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
        if (this._serialPort['isOpen']) {
            this._serialPort.close(callback);
        }
    }

    public get isRunning(): boolean {
        return this._running;
        // return this._serialPort.isOpen();
    }

    public send(msg: string): SimpleSerialProtocol {
        this._serialPort.write(msg);
        return this;
    }

    public sendCommand(commandChar: string, ...args): SimpleSerialProtocol {
        let rawMessage: string = commandChar;
        if (args && args.length > 0) {
            rawMessage += args.join(SimpleSerialProtocol.DELIMITER);
        }
        rawMessage += SimpleSerialProtocol.END;
        this._serialPort.write(rawMessage);
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

    public onErrorCommand(onErrorCallback: (error: SimpleSerialProtocolError) => void): SimpleSerialProtocol {
        this._onErrorCallback = onErrorCallback;
        return this;
    }

    // TODO: prevent overflow or implement better invalid message handling
    // TODO: onError
    private onData(buf: Buffer): void {

        let msg: string = buf.toString('ascii');
        // console.log('onData:', msg);
        let len = msg.length;
        for (let i = 0; i < len; i++) {
            let char = msg[i];
            this._currentBuffer += char;

            if (this._currentBuffer.length > this._maxBufferSize) {
                this._currentBuffer = '';
                console.log('warning! maxBufferSize exceeded');
                this.callOnError(new SimpleSerialProtocolError(SimpleSerialProtocolError.MAX_BUFFERSIZE_EXCEEDED, new CommandMessage(this._currentBuffer)));
                return;
            }
            if (char === SimpleSerialProtocol.END) {
                let commandChar: string = this._currentBuffer.charAt(0);
                if (commandChar === SimpleSerialProtocol.ERROR) {
                    let commandMsg: CommandMessage = new CommandMessage(this._currentBuffer);
                    let errorNum: number = commandMsg.getIntValueAt(0);
                    let error: SimpleSerialProtocolError = null;
                    switch (errorNum) {
                        case SimpleSerialProtocol.ERROR_NUM_MESSAGE_INCOMPLETE:
                            error = new SimpleSerialProtocolError(SimpleSerialProtocolError.MESSAGE_INCOMPLETE, commandMsg);
                            break;
                        case SimpleSerialProtocol.ERROR_NUM_INVALID_COMMAND:
                            error = new SimpleSerialProtocolError(SimpleSerialProtocolError.INVALID_COMMAND, commandMsg);
                            break;
                        case SimpleSerialProtocol.ERROR_NUM_UNREGISTERED_COMMAND:
                            error = new SimpleSerialProtocolError(SimpleSerialProtocolError.UNREGISTERED_COMMAND, commandMsg);
                            break;
                        case SimpleSerialProtocol.ERROR_NUM_INVALID_ARGUMENTS_COUNT:
                            error = new SimpleSerialProtocolError(SimpleSerialProtocolError.INVALID_ARGUMENTS_COUNT, commandMsg);
                            break;
                        default:
                            error = new SimpleSerialProtocolError(SimpleSerialProtocolError.UNKNOWN, commandMsg);
                    }
                    this.callOnError(error);
                    this._currentBuffer = '';
                    return;
                }
                let commandFunc = this._registeredCommandCallbacks.getValue(commandChar);
                if (commandFunc) {
                    commandFunc.apply(null, [new CommandMessage(this._currentBuffer)]);
                } else {
                    this._currentBuffer = '';
                    throw '\'Could not find callback for command "\' + commandChar + \'", message: \' + this._currentBuffer';
                }
                this._currentBuffer = '';
            }
        }
    }

    private callOnError(simpleSerialProtocolError: SimpleSerialProtocolError): void {
        if (!this._onErrorCallback) {
            throw 'no ErrorHandler attached. use SimpleSerialProtocol.onErrorCommand(errorCallbackFuntion)';
        } else {
            this._onErrorCallback(simpleSerialProtocolError);
        }
    }
}
