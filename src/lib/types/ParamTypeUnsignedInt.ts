import {ParamTypeInt} from "./ParamTypeInt";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedInt extends ParamTypeInt implements ParamType {

    static NAME: string = "unsigned_int";

    getData(): number {
        return this.rawData.readUInt8(0);
    }

}
