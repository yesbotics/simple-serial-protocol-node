import {ParamTypeShort} from "./ParamTypeShort";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedShort extends ParamTypeShort implements ParamType {

    static NAME: string = "unsigned_short";

    getData(): number {
        return this.rawData.readUInt16LE(0);
    }
}
