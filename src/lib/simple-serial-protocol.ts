import * as SerialPort from 'serialport';
import * as ByteLength from '@serialport/parser-byte-length';
import {SimpleSerialProtocolError} from "./simple-serial-protocol-error";
import {CommandCallback} from "./simple-serial-protocol-command";
import {Baudrate} from "../typings";
import {ParamType} from "./types/param-type";

export class SimpleSerialProtocol {

    // private static readonly COMMAND_GET_DEVICE_ID: string = String.fromCharCode(0x05); //ENQ
    // private static readonly COMMAND_START: string = String.fromCharCode(0x02); // STX // 0x02
    // private static readonly COMMAND_STOP: string = String.fromCharCode(0x03); // ETX // 0x03
    // private static readonly COMMAND_ALREADY_STARTED: string = String.fromCharCode(0x11); // DC1 //  0x11
    // private static readonly COMMAND_NOT_STARTED: string = String.fromCharCode(0x12); // DC2 //  0x12
    // private static readonly COMMAND_ERROR: string = String.fromCharCode(0x18); // CAN //  0x18
    // private static readonly COMMAND_RECEIVED: string = String.fromCharCode(0x06); // ACK //  0x06
    // private static readonly COMMAND_KEEP_ALIVE: string = String.fromCharCode(0x16); // SYN //  0x16
    // private static readonly COMMAND_KEEP_ALIVE_TIMEOUT: string = String.fromCharCode(0x1B); // ESC //  0x1B

    // private static readonly STATE_: string = String.fromCharCode(0x1B); // ESC //  0x1B

    private static readonly CHAR_EOT: number = 0x0A; // End of Transmission - Line Feed Zeichen \n
    private static readonly CHAR_NULL: number = 0x00; // 0x00 // End of String

    private _isInitialized: boolean = false;
    private serialPort: SerialPort;
    private oneByteParser: NodeJS.WritableStream;
    private registeredCommands: Map<string, CommandCallback> = new Map();
    /**
     * Buffer wird nach jedem empfangenen Command befüllt
     */
    private buffer: Buffer = Buffer.allocUnsafe(2);
    private bufferOffset: number = 0;
    private currentCommandCallback: CommandCallback;

    constructor(portname: string, baudrate: Baudrate) {
        this.serialPort = new SerialPort(portname, {
            autoOpen: false,
            baudRate: baudrate
        });
    }

    async init(initilizationDelay: number = 1000): Promise<void> {
        if (this.isOpen()) {
            return Promise.reject('already connected');
        }
        this.oneByteParser = this.serialPort.pipe(new ByteLength({length: 1}));
        this.oneByteParser.on('data', this.onData.bind(this));

        this.serialPort.open((err) => {
            if (err) {
                this.dispose()
                    .catch(() => {
                        return Promise.reject(err);
                    })
                    .then(() => {
                        return Promise.reject(err);
                    });
            }
        });

        const promiseOpen = new Promise<void>((resolve, reject) => {
            this.serialPort.on('open', () => {
                setTimeout(() => {
                    this._isInitialized = true;
                    resolve();
                }, initilizationDelay);
            });
        });

        await promiseOpen;
    }

    async dispose(): Promise<void> {
        this.serialPort.removeAllListeners();
        this.oneByteParser.removeAllListeners();
        this._isInitialized = true;
        if (this.isOpen()) {
            await this.serialPort.close(async (err) => {
                if (err) {
                    console.error(err);
                }
                return Promise.resolve();
            });
        }
    }

    isOpen(): boolean {
        return this.serialPort.isOpen;
    }

    public isInitialized(): boolean {
        return this._isInitialized;
    }

    registerCommand(commandName: string, callback: (...args: any[]) => void, paramTypes: string[] = null) {
        if (commandName.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_COMMAND_NAME_TO_LONG);
        }
        if (this.registeredCommands.has(commandName)) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_COMMAND_IS_ALREADY_REGISTERED);
        }
        const command: CommandCallback = new CommandCallback(
            commandName,
            callback,
            paramTypes
        );
        this.registeredCommands.set(commandName, command);
        // this.updateBufferSize();
    }

    // public async getDeviceId(): Promise<string> {
    //     this.writeCommand(SimpleSerialProtocol.COMMAND_GET_DEVICE_ID);
    //     this.writeEot();
    //     return null;
    // }

    // void init();
    // void registerCommand(byte command, ExternalCallbackPointer externalCommandCallbackPointer);
    // byte readCommand();
    // byte readEot();
    // void writeCommand(byte command);
    // void writeEot();

    private writeCommand(command: string): void {
        this.write(command);
    }

    // private writeEot(): void {
    //     this.serialPort.write(SimpleSerialProtocol.CHAR_EOT);
    //     // this.write(SimpleSerialProtocol.CHAR_EOT);
    // }

    private write(msg: string): void {
        console.log('write', msg);
        this.serialPort.write(msg, "ascii");
    }

    protected onData(data: Uint8Array): void {
        if (!this._isInitialized) {
            return;
        }
        console.log('onData', data, data.toString());
        if (this.currentCommandCallback) {
            /**
             * Got command already -> reading param data
             */
            this.saveByte(data);
        } else {
            const commandName = data.toString();
            if (!this.registeredCommands.has(commandName)) {
                /**
                 * Command not found
                 */
                throw new Error("Command not found: " + commandName);
            } else {
                /**
                 * New command -> Preparing buffer for reading
                 */
                this.currentCommandCallback = this.registeredCommands.get(commandName);
                if (this.currentCommandCallback.paramBufferLength > 0) {
                    this.buffer = Buffer.allocUnsafe(this.currentCommandCallback.paramBufferLength);
                }
            }
        }
    }

    private saveByte(data: Uint8Array) {
        const byte: number = data[0];
        if (this.buffer.length === this.currentCommandCallback.paramBufferLength) {
            /**
             * Buffer full? Awaiting EOT
             */
            if (byte === SimpleSerialProtocol.CHAR_EOT) {
                /**
                 * Buffer is full -> Parsing params and call callback
                 */
                const parsedParams = this.getParamsFromBuffer();
                this.currentCommandCallback.callback.apply(null, parsedParams);
            } else {
                /**
                 * Wrong EOT byte
                 */
                throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_EOT_WAS_NOT_READ);
            }
        } else {
            /**
             * Filling buffer
             */
            // Buffer.concat()
            this.buffer.writeUInt8(data[0], this.bufferOffset);
            this.bufferOffset++;
        }
    }

    private getParamsFromBuffer(): any[] {
        let params: any[] = [];
        let offset: number = 0;
        for (const paramType of this.currentCommandCallback.paramTypes) {
            switch (paramType) {
                case ParamType.PARAM_INT:
                    params.push(this.buffer.readInt8(offset));
                    offset += 1;
                    break;
                case ParamType.PARAM_UINT:
                    params.push(this.buffer.readUInt8(offset));
                    offset += 1;
                    break;
            }
        }
        return params;
    }

    // /**
    //  * Reallocates buffer memory. Using max Command params length
    //  */
    // private updateBufferSize() {
    //     let maxParamBufferLength: number = 0;
    //     this.registeredCommands.forEach((command: CommandCallback, key: string) => {
    //         maxParamBufferLength = Math.max(maxParamBufferLength, command.paramBufferLength);
    //     });
    //     console.log("max param buffer length", maxParamBufferLength);
    //     this.buffer = Buffer.allocUnsafe(maxParamBufferLength);
    // }
}
