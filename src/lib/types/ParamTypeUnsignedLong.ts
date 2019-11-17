import {ParamTypeLong} from "./ParamTypeLong";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedLong extends ParamTypeLong implements ParamType {

    static NAME: string = "unsigned_long";

    getData(): number {
        return this.rawData.readUInt32LE(0);
    }
}
