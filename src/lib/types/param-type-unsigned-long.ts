import {ParamType} from "./param-type";
import {ParamTypeLong} from "./param-type-long";

export class ParamTypeUnsignedLong extends ParamTypeLong implements ParamType {

    static NAME: string = "unsigned_long";

    getData(): number {
        return this.rawData.readUInt32LE(0);
    }
}
