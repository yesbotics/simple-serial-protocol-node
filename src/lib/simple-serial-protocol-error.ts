import {CommandMessage} from "./command-message";

export class SimpleSerialProtocolError extends Error {
    // public static readonly MAX_BUFFERSIZE_EXCEEDED: string = 'MAX_BUFFERSIZE_EXCEEDED';
    //
    // public static readonly MESSAGE_INCOMPLETE: string = 'MESSAGE_INCOMPLETE';
    // public static readonly INVALID_COMMAND: string = 'INVALID_COMMAND';
    // public static readonly UNREGISTERED_COMMAND: string = 'UNREGISTERED_COMMAND';
    // public static readonly INVALID_ARGUMENTS_COUNT: string = 'INVALID_ARGUMENTS_COUNT';


    public static readonly ERROR_COMMAND_IS_ALREADY_REGISTERED = "ERROR_COMMAND_IS_ALREADY_REGISTERED";
    public static readonly ERROR_COMMAND_IS_NOT_REGISTERED = "ERROR_COMMAND_IS_NOT_REGISTERED";
    public static readonly ERROR_IS_NOT_EOT = "ERROR_IS_NOT_EOT";
    public static readonly ERROR_EOT_WAS_NOT_READ = "ERROR_EOT_WAS_NOT_READ ";
    public static readonly UNKNOWN: string = 'UNKNOWN';
    public static readonly ERROR_COMMAND_NAME_TO_LONG: string = 'ERROR_COMMAND_NAME_TO_LONG';

    constructor(
        private _type: string,
        // private _message: CommandMessage
    ) {
        super(_type);
    }

    public get type(): string {
        return this._type;
    }

    // public get message(): CommandMessage {
    //     return this._message;
    // }
}
