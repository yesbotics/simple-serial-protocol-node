import {CommandMessage} from "./command-message";

export class SimpleSerialProtocolError {
    public static readonly MAX_BUFFERSIZE_EXCEEDED: string = 'MAX_BUFFERSIZE_EXCEEDED';

    public static readonly MESSAGE_INCOMPLETE: string = 'MESSAGE_INCOMPLETE';
    public static readonly INVALID_COMMAND: string = 'INVALID_COMMAND';
    public static readonly UNREGISTERED_COMMAND: string = 'UNREGISTERED_COMMAND';
    public static readonly INVALID_ARGUMENTS_COUNT: string = 'INVALID_ARGUMENTS_COUNT';

    public static readonly UNKNOWN: string = 'UNKNOWN';


    private _type: string;
    private _message: CommandMessage;

    constructor(type: string, message: CommandMessage) {
        this._type = type;
        this._message = message;
    }

    public get type(): string {
        return this._type;
    }

    public get message(): CommandMessage {
        return this._message;
    }
}