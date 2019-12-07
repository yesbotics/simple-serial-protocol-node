import SerialPort from "serialport";
import ByteLength from '@serialport/parser-byte-length';
import {RegisteredCommand} from "./RegisteredCommand";
import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";
import {ParamsParser} from "./ParamsParser";
import {ParamTypeChar} from "./types/ParamTypeChar";
import {ParamTypeString} from "./types/ParamTypeString";
import {ParamTypeFloat} from "./types/ParamTypeFloat";
import {ParamType} from "./types/ParamType";
import {Baudrate} from "./Baudrate";
import {CommandParam} from "./CommandParam";
import {ParamTypeBoolean} from "./types/ParamTypeBoolean";
import {ParamTypeInt8} from "./types/ParamTypeInt8";
import {ParamTypeInt16} from "./types/ParamTypeInt16";
import {ParamTypeInt32} from "./types/ParamTypeInt32";
import {ParamTypeUnsignedInt8} from "./types/ParamTypeUnsignedInt8";
import {ParamTypeUnsignedInt16} from "./types/ParamTypeUnsignedInt16";
import {ParamTypeUnsignedInt32} from "./types/ParamTypeUnsignedInt32";
import {ParamTypeByte} from "./types/ParamTypeByte";
import {ParamTypeUnsignedInt64} from "./types/ParamTypeUnsignedInt64";
import {ParamTypeInt64} from "./types/ParamTypeInt64";
import {Command} from "./Command";

export class SimpleSerialProtocol {

    private static readonly CHAR_EOT: number = 0x0A; // End of Transmission - Line Feed Zeichen \n

    private _isInitialized: boolean = false;
    private serialPort: SerialPort;
    private oneByteParser: NodeJS.WritableStream;
    private registeredCommands: Map<string, RegisteredCommand> = new Map();
    private currentCommand: RegisteredCommand;
    private paramTypeInstances: Map<string, ParamType<any>> = new Map();

    constructor(portname: string, baudrate: Baudrate) {
        this.initParamTypes();
        this.serialPort = new SerialPort(portname, {
            autoOpen: false,
            baudRate: baudrate
        });
    }

    async init(initilizationDelay: number = 2500): Promise<void> {
        if (this.isOpen()) {
            return Promise.reject('already connected');
        }
        this.oneByteParser = this.serialPort.pipe(new ByteLength({length: 1}));
        this.oneByteParser.on('data', this.onData.bind(this));

        this.serialPort.open((err) => {
            if (err) {
                this.dispose()
                    .catch(() => {
                        throw err;
                    })
                    .then(() => {
                        throw err;
                    });
            }
        });

        const promiseOpen: Promise<void> = new Promise<void>((resolve, reject) => {
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

    /**
     * Pseudooverloading
     */
    writeCommand(command: Command): void;
    writeCommand(commandId: string): void;
    writeCommand(commandId: string, params: CommandParam[]): void;

    writeCommand(commandIdOrCommand: string | Command, params: CommandParam[] = null): void {
        let command = '';
        if (commandIdOrCommand instanceof Command) {
            command = commandIdOrCommand.getCommandId();
            params = commandIdOrCommand.getCommandParams();
        } else {
            command = commandIdOrCommand;
        }

        if (command.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        this.write(this.paramTypeInstances.get(ParamTypeChar.NAME).getBuffer(command));
        if (params) {
            for (const param of params) {
                if (ParamsParser.hasType(param.type)) {
                    const typeClassInstance: ParamType<any> = this.paramTypeInstances.get(param.type);
                    const buffer: Buffer = typeClassInstance.getBuffer(param.value);
                    this.write(buffer);
                } else {
                    throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_PARAM_TYPE_UNKNOWN);
                }
            }
        }
        this.write(this.paramTypeInstances.get(ParamTypeInt8.NAME).getBuffer(SimpleSerialProtocol.CHAR_EOT));
    }

    addParamType(name: string, clazz: any) {
        if (ParamsParser.hasType(name)) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_PARAM_TYPE_IS_ALREADY_REGISTERED);
        }
        ParamsParser.addType(name, clazz);
        this.paramTypeInstances.set(name, new clazz());
    }

    addErrorListener(listener: (err: Error) => void) {
        this.serialPort.addListener("error", listener);
    }

    addCloseListener(listener: () => void) {
        this.serialPort.addListener("close", listener);
    }

    removeErrorListener(listener: (err: Error) => void) {
        this.serialPort.removeListener('error', listener);
    }

    removeCloseListener(listener: () => void) {
        this.serialPort.removeListener('close', listener);
    }

    private initParamTypes() {
        this.addParamType(ParamTypeByte.NAME, ParamTypeByte);
        this.addParamType(ParamTypeBoolean.NAME, ParamTypeBoolean);
        this.addParamType(ParamTypeChar.NAME, ParamTypeChar);
        this.addParamType(ParamTypeString.NAME, ParamTypeString);
        this.addParamType(ParamTypeFloat.NAME, ParamTypeFloat);
        this.addParamType(ParamTypeInt8.NAME, ParamTypeInt8);
        this.addParamType(ParamTypeInt16.NAME, ParamTypeInt16);
        this.addParamType(ParamTypeInt32.NAME, ParamTypeInt32);
        this.addParamType(ParamTypeInt64.NAME, ParamTypeInt64);
        this.addParamType(ParamTypeUnsignedInt8.NAME, ParamTypeUnsignedInt8);
        this.addParamType(ParamTypeUnsignedInt16.NAME, ParamTypeUnsignedInt16);
        this.addParamType(ParamTypeUnsignedInt32.NAME, ParamTypeUnsignedInt32);
        this.addParamType(ParamTypeUnsignedInt64.NAME, ParamTypeUnsignedInt64);
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
