import {ParamType} from "./types/ParamType";
import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";
import {ParamTypeChar} from "./types/ParamTypeChar";

export class Command {
    private commandId: string;
    private paramTypes: ParamType<any>[];

    public constructor(commandId: string) {
        if (commandId.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        this.commandId = commandId;
    }

    public addByteValue(byteValue: number): Command {
        return this;
    }

    public addBooleanValue(booleanValue: boolean): Command {
        return this;
    }

    public addInt8Value(int8Value: number): Command {
        return this;
    }

    public addUint8Value(uint8Value: number): Command {
        return this;
    }

    public addInt16Value(int16Value: number): Command {
        return this;
    }

    public addUint16Value(uint16Value: number): Command {
        return this;
    }

    public addInt32Value(int32Value: number): Command {
        return this;
    }

    public addUint32Value(uint32Value: number): Command {
        return this;
    }

    public addInt64Value(int64Value: bigint): Command {
        return this;
    }

    public addUint64Value(uint64Value: bigint): Command {
        return this;
    }

    public addFloatValue(floatValue: number): Command {
        return this;
    }

    public addCharValue(charValue: string): Command {
        return this;
    }

    public addCharArrayValue(charArrayValue: string): Command {
        return this;
    }

}
