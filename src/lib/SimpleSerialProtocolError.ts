export class SimpleSerialProtocolError extends Error {

    public static readonly ERROR_COMMAND_IS_ALREADY_REGISTERED = "ERROR_COMMAND_IS_ALREADY_REGISTERED";
    public static readonly ERROR_COMMAND_IS_NOT_REGISTERED = "ERROR_COMMAND_IS_NOT_REGISTERED";
    public static readonly ERROR_IS_NOT_EOT = "ERROR_IS_NOT_EOT";
    public static readonly ERROR_EOT_WAS_NOT_READ = "ERROR_EOT_WAS_NOT_READ";
    public static readonly ERROR_PARAM_TYPE_UNKNOWN = "ERROR_PARAM_TYPE_UNKNOWN";
    public static readonly UNKNOWN: string = 'UNKNOWN';
    public static readonly ERROR_WRONG_COMMAND_NAME_LENGTH: string = 'ERROR_WRONG_COMMAND_NAME_LENGTH';
    public static readonly ERROR_PARAM_TYPE_IS_ALREADY_REGISTERED: string = 'ERROR_PARAM_TYPE_IS_ALREADY_REGISTERED';
    public static readonly ERROR_PARSER_TOO_MANY_BYTES: string = 'ERROR_PARSER_TOO_MANY_BYTES';

    constructor(
        private _type: string,
        private _message: string = ''
    ) {
        super(_type);
    }

    public get type(): string {
        return this._type;
    }

    public get message(): string {
        return this._message;
    }
}
