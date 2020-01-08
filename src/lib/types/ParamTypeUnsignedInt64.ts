import {ParamType} from "./ParamType";
import {ParamTypeInt64} from "./ParamTypeInt64";

export class ParamTypeUnsignedInt64 extends ParamTypeInt64 implements ParamType<bigint> {

    static NAME: string = "unsigned_int64";

    getBuffer(data: bigint): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeBigUInt64LE(data, 0);
        return buffer;
    }

    getData(): bigint {
        return this.rawData.readBigUInt64LE(0);
    }

}
