import {SimpleSerialProtocolError} from "./SimpleSerialProtocolError";
import {ParamTypeChar} from "./types/ParamTypeChar";
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

export class ReadCommandConfig {
    private types: string[] = [];

    public constructor(
        private readonly commandId: string,
        private readonly callback: (...args: any[]) => void
    ) {
        if (commandId.length !== 1) {
            throw new SimpleSerialProtocolError(SimpleSerialProtocolError.ERROR_WRONG_COMMAND_NAME_LENGTH);
        }
        this.commandId = commandId;
    }

    public getCallback(): (...args: any[]) => void {
        return this.callback;
    }

    public getCommandId(): string {
        return this.commandId;
    }

    public getCommandParamTypes(): string[] {
        return this.types;
    }

    public addByteParam(): ReadCommandConfig {
        this.types.push(ParamTypeByte.NAME);
        return this;
    }

    public addBooleanParam(): ReadCommandConfig {
        this.types.push(ParamTypeBoolean.NAME);
        return this;
    }

    public addInt8Param(): ReadCommandConfig {
        this.types.push(ParamTypeInt8.NAME);
        return this;
    }

    public addUInt8Param(): ReadCommandConfig {
        this.types.push(ParamTypeUnsignedInt8.NAME);
        return this;
    }

    public addInt16Param(): ReadCommandConfig {
        this.types.push(ParamTypeInt16.NAME);
        return this;
    }

    public addUInt16Param(): ReadCommandConfig {
        this.types.push(ParamTypeUnsignedInt16.NAME);
        return this;
    }

    public addInt32Param(): ReadCommandConfig {
        this.types.push(ParamTypeInt32.NAME);
        return this;
    }

    public addUInt32Param(): ReadCommandConfig {
        this.types.push(ParamTypeUnsignedInt32.NAME);
        return this;
    }

    public addInt64Param(): ReadCommandConfig {
        this.types.push(ParamTypeInt64.NAME);
        return this;
    }

    public addUInt64Param(): ReadCommandConfig {
        this.types.push(ParamTypeUnsignedInt64.NAME);
        return this;
    }

    public addFloatParam(): ReadCommandConfig {
        this.types.push(ParamTypeFloat.NAME);
        return this;
    }

    public addCharParam(): ReadCommandConfig {
        this.types.push(ParamTypeChar.NAME);
        return this;
    }

    public addStringParam(): ReadCommandConfig {
        this.types.push(ParamTypeString.NAME);
        return this;
    }

    public addCustomParam(paramTypeName: string): ReadCommandConfig {
        this.types.push(paramTypeName);
        return this;
    }

}
