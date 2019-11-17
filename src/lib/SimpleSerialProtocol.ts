import * as SerialPort from 'serialport';
import * as ByteLength from '@serialport/parser-byte-length';
import {RegisteredCommand} from "./RegisteredCommand";
import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";
import {ParamsParser} from "./ParamsParser";
import {ParamTypeInt} from "./types/ParamTypeInt";
import {ParamTypeChar} from "./types/ParamTypeChar";

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

    private _isInitialized: boolean = false;
    private serialPort: SerialPort;
    private oneByteParser: NodeJS.WritableStream;
    private registeredCommands: Map<string, RegisteredCommand> = new Map();
    private currentCommand: RegisteredCommand;

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
        this.registeredCommands.forEach((value => value.dispose()));
        this.registeredCommands.clear();
        this.registeredCommands = null;
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

    isInitialized(): boolean {
        return this._isInitialized;
    }

    registerCommand(commandName: string, callback: (...args: any[]) => void, paramTypes: string[] = null) {
        if (commandName.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        if (this.registeredCommands.has(commandName)) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_COMMAND_IS_ALREADY_REGISTERED);
        }

        const command: RegisteredCommand = new RegisteredCommand(
            commandName,
            callback,
            paramTypes
        );
        this.registeredCommands.set(commandName, command);
    }

    unregisterCommand(commandName: string) {
        if (this.registeredCommands.has(commandName)) {
            const command = this.registeredCommands.get(commandName);
            command.dispose();
            this.registeredCommands.delete(commandName);
        }
    }

    writeCommand(command: string, params: CommandData[] = null): void {
        if (command.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        this.write(ParamTypeChar.getBuffer(command));
        if (params) {
            for (const param of params) {
                if (ParamsParser.TYPES.has(param.type)) {
                    const typeClass = ParamsParser.TYPES.get(param.type);
                    const buffer: Buffer = typeClass.getBuffer(param.value);
                    this.write(buffer);
                } else {
                    throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_PARAM_TYPE_UNKNOWN);
                }
            }
        }
        // this.write([SimpleSerialProtocol.CHAR_EOT]);
        this.write(ParamTypeInt.getBuffer(SimpleSerialProtocol.CHAR_EOT));
    }

    private write(buffer: string | number[] | Buffer): void {
        this.serialPort.write(buffer, "ascii");
    }

    private onData(data: Uint8Array): void {
        if (!this._isInitialized) {
            return;
        }
        const byte: number = data[0];
        // console.log('onData', data, data.toString());
        if (this.currentCommand) {
            /**
             * Got command already -> reading param data
             */
            if (this.currentCommand.paramsRead()) {
                /**
                 * Check EOT -> call callback
                 */
                // console.log("ssp - paramsRead", byte);
                if (byte === SimpleSerialProtocol.CHAR_EOT) {
                    this.currentCommand.callCallback();
                    this.currentCommand = null;
                } else {
                    throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_EOT_WAS_NOT_READ);
                }
            } else {
                // console.log("ssp - addByte", byte);
                this.currentCommand.addByte(byte);
            }
        } else {
            const commandName = String.fromCharCode(byte);
            if (!this.registeredCommands.has(commandName)) {
                /**
                 * Command not found
                 */
                throw new Error("Command not found: " + commandName);
            } else {
                /**
                 * New command -> Preparing buffer for reading
                 */
                this.currentCommand = this.registeredCommands.get(commandName);
                this.currentCommand.resetParamParser();
            }
        }
    }

}
