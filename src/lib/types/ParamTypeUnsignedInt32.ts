import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeUnsignedInt32 extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "unsigned_int32";

    getLength(): number {
        return 4;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeUInt32LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt32LE(0);
    }
}
