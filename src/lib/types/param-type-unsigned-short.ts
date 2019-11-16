import {ParamType} from "./param-type";
import {ParamTypeShort} from "./param-type-short";

export class ParamTypeUnsignedShort extends ParamTypeShort implements ParamType {

    static NAME: string = "unsigned_short";

    getData(): number {
        return this.rawData.readUInt16LE(0);
    }
}
