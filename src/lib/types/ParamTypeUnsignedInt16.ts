import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeUnsignedInt16 extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "unsigned_int16";

    getLength(): number {
        return 2;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeUInt16LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt16LE(0);
    }
}
