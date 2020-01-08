import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeInt32 extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "int32";

    getLength(): number {
        return 4;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeInt32LE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readInt32LE(0);
    }
}
