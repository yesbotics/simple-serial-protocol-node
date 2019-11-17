import {ParamTypeLong} from "./ParamTypeLong";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedLong extends ParamTypeLong implements ParamType {

    static NAME: string = "unsigned_long";

    static getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(4);
        buffer.writeUInt32LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt32LE(0);
    }
}
