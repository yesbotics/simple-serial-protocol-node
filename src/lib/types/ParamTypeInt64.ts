import {ParamType} from "./ParamType";

export class ParamTypeInt64 implements ParamType<bigint> {

    static NAME: string = "int64";

    protected rawData: Buffer = Buffer.allocUnsafe(this.getLength());
    protected index: number = 0;

    getLength(): number {
        return 8;
    }

    getBuffer(data: bigint): Buffer {
        const buffer = Buffer.allocUnsafe(this.getLength());
        buffer.writeBigInt64LE(data, 0);
        return buffer;
    }

    reset() {
        this.index = 0;
    }

    addByte(byte: number): void {
        if (this.isFull()) {
            return;
        }
        this.rawData[this.index] = byte;
        this.index++;
    }

    isFull(): boolean {
        return this.index >= this.getLength();
    }

    getData(): bigint {
        return this.rawData.readBigInt64LE(0);
    }

    dispose(): void {
        this.rawData = null;
    }
}
