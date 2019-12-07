import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";
import {ParamTypeChar} from "./types/ParamTypeChar";
import {CommandParam} from "./CommandParam";
import {ParamTypeByte} from "./types/ParamTypeByte";
import {ParamTypeBoolean} from "./types/ParamTypeBoolean";
import {ParamTypeInt8} from "./types/ParamTypeInt8";
import {ParamTypeUnsignedInt8} from "./types/ParamTypeUnsignedInt8";
import {ParamTypeInt16} from "./types/ParamTypeInt16";
import {ParamTypeUnsignedInt16} from "./types/ParamTypeUnsignedInt16";
import {ParamTypeInt32} from "./types/ParamTypeInt32";
import {ParamTypeUnsignedInt32} from "./types/ParamTypeUnsignedInt32";
import {ParamTypeInt64} from "./types/ParamTypeInt64";
import {ParamTypeUnsignedInt64} from "./types/ParamTypeUnsignedInt64";
import {ParamTypeFloat} from "./types/ParamTypeFloat";
import {ParamTypeString} from "./types/ParamTypeString";

export class Command {
    private readonly commandId: string;
    private commandParams: CommandParam[] = [];

    public constructor(commandId: string) {
        if (commandId.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        this.commandId = commandId;
    }

    public getCommandId(): string {
        return this.commandId;
    }

    public getCommandParams(): CommandParam[] {
        return this.commandParams;
    }

    public addByteValue(byteValue: number): Command {
        this.commandParams.push({
            type: ParamTypeByte.NAME,
            value: byteValue
        });
        return this;
    }

    public addBooleanValue(booleanValue: boolean): Command {
        this.commandParams.push({
            type: ParamTypeBoolean.NAME,
            value: booleanValue
        });
        return this;
    }

    public addInt8Value(int8Value: number): Command {
        this.commandParams.push({
            type: ParamTypeInt8.NAME,
            value: int8Value
        });
        return this;
    }

    public addUint8Value(uint8Value: number): Command {
        this.commandParams.push({
            type: ParamTypeUnsignedInt8.NAME,
            value: uint8Value
        });
        return this;
    }

    public addInt16Value(int16Value: number): Command {
        this.commandParams.push({
            type: ParamTypeInt16.NAME,
            value: int16Value
        });
        return this;
    }

    public addUint16Value(uint16Value: number): Command {
        this.commandParams.push({
            type: ParamTypeUnsignedInt16.NAME,
            value: uint16Value
        });
        return this;
    }

    public addInt32Value(int32Value: number): Command {
        this.commandParams.push({
            type: ParamTypeInt32.NAME,
            value: int32Value
        });
        return this;
    }

    public addUint32Value(uint32Value: number): Command {
        this.commandParams.push({
            type: ParamTypeUnsignedInt32.NAME,
            value: uint32Value
        });
        return this;
    }

    public addInt64Value(int64Value: bigint): Command {
        this.commandParams.push({
            type: ParamTypeInt64.NAME,
            value: int64Value
        });
        return this;
    }

    public addUint64Value(uint64Value: bigint): Command {
        this.commandParams.push({
            type: ParamTypeUnsignedInt64.NAME,
            value: uint64Value
        });
        return this;
    }

    public addFloatValue(floatValue: number): Command {
        this.commandParams.push({
            type: ParamTypeFloat.NAME,
            value: floatValue
        });
        return this;
    }

    public addCharValue(charValue: string): Command {
        this.commandParams.push({
            type: ParamTypeChar.NAME,
            value: charValue
        });
        return this;
    }

    public addStringValue(stringValue: string): Command {
        this.commandParams.push({
            type: ParamTypeString.NAME,
            value: stringValue
        });
        return this;
    }

    public addCustomValue(customValue: any, paramTypeName: string): Command {
        this.commandParams.push({
            type: paramTypeName,
            value: customValue
        });
        return this;
    }

}
