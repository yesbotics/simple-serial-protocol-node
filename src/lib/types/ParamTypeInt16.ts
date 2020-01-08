import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeInt16 extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "int16";

    getLength(): number {
        return 2;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeInt16LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readInt16LE(0);
    }
}
