import {ParamTypeShort} from "./ParamTypeShort";
import {ParamType} from "./ParamType";

export class ParamTypeUnsignedShort extends ParamTypeShort implements ParamType<number> {

    static NAME: string = "unsigned_short";

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(2);
        buffer.writeUInt16LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt16LE(0);
    }
}
