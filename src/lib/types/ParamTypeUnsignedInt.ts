import {ParamTypeInt} from "./ParamTypeInt";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedInt extends ParamTypeInt implements ParamType<number> {

    static NAME: string = "unsigned_int";

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(1);
        buffer.writeUIntLE(data, 0, 1);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt8(0);
    }
}
