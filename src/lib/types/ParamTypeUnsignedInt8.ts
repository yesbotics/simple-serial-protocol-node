import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeUnsignedInt8 extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "unsigned_int8";

    getLength(): number {
        return 1;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeUInt8(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readUInt8(0);
    }
}
