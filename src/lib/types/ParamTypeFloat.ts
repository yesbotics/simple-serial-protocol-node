import {ParamType} from "./ParamType";
import {ParamTypeInt8} from "./ParamTypeInt8";

export class ParamTypeFloat extends ParamTypeInt8 implements ParamType<number> {

    static NAME: string = "float";

    protected rawData = Buffer.allocUnsafe(this.getLength());
    protected index: number;

    getLength(): number {
        return 4;
    }

    getBuffer(data: number): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeFloatLE(data, 0);
        return buffer;
    }

    getData(): number {
        return this.rawData.readFloatLE(0);
    }
}
