import {ParamType} from "./param-type";
import {ParamTypeInt} from "./param-type-int";

export class ParamTypeUnsignedInt extends ParamTypeInt implements ParamType {

    static NAME: string = "unsigned_int";

    getData(): number {
        return this.rawData.readUInt8(0);
    }

}
