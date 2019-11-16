import {ParamType} from "./param-type";
import {ParamTypeInt} from "./param-type-int";

export class ParamTypeUint extends ParamTypeInt implements ParamType {

    static NAME: string = "uint";

    getData(): number {
        return this.rawData.readUInt8(0);
    }

}
